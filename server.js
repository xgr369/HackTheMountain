require("dotenv").config();

const cors = require("cors");
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { spawn } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(__dirname));

const PORT = process.env.PORT || 999;
const EVENTS_DIR = path.join(__dirname, "storage", "events");
const UPLOADS_DIR = path.join(__dirname, "storage", "uploads");

const MOTION_EVENT_RANGE = 200;
const MOTION_WINDOW_MS = 120_000;
const motionByEvent = {};

app.use("/uploads", express.static(UPLOADS_DIR));

const ok = (res, data, status = 200) => res.status(status).json(data);
const fail = (res, status, error, details) => res.status(status).json({ error, ...(details && { details }) });

const asyncRoute = fn => (req, res) => fn(req, res).catch(err => fail(res, 500, "Server error", err.message));

async function ensureDirs() {
	await fs.mkdir(EVENTS_DIR, { recursive: true });
	await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

function toNumber(value) {
	const n = Number(value);
	return Number.isFinite(n) ? n : null;
}

function getKey(event) {
	if (event.lat === undefined || event.lng === undefined || event.time === undefined) {
		throw new Error("Invalid event fields");
	}

	return `${event.lat}_${event.lng}_${event.time}_${crypto.randomUUID().slice(0, 8)}`;
}

function eventPath(key) {
	if (!key || key.includes("/") || key.includes("\\") || key.includes("..")) {
		throw new Error("Invalid event key");
	}

	return path.join(EVENTS_DIR, key);
}

async function readEvent(key) {
	try {
		const data = await fs.readFile(eventPath(key), "utf8");
		return JSON.parse(data);
	} catch {
		return null;
	}
}

async function writeEvent(key, event) {
	await ensureDirs();
	await fs.writeFile(eventPath(key), JSON.stringify(event, null, 2), "utf8");
}

async function readAllEvents() {
	await ensureDirs();

	const files = await fs.readdir(EVENTS_DIR);
	const events = await Promise.all(
		files.map(async key => {
			const event = await readEvent(key);
			return event ? { key, ...event } : null;
		})
	);

	return events.filter(Boolean);
}

function todayUnix() {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return Math.floor(today.getTime() / 1000);
}

async function getUpcomingEvents() {
	const events = await readAllEvents();

	return events
		.filter(event => Number(event.time) >= todayUnix())
		.sort((a, b) => Number(a.time) - Number(b.time));
}

function parseTags(value, fallback = []) {
	if (!value) return fallback;

	try {
		const tags = typeof value === "string" ? JSON.parse(value) : value;
		return Array.isArray(tags) ? tags : fallback;
	} catch {
		return fallback;
	}
}

async function writeImage(file) {
	if (!file?.data || !file?.filename) throw new Error("Invalid file");

	const ext = path.extname(file.filename).toLowerCase();
	if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
		throw new Error("Unsupported image type");
	}

	await ensureDirs();

	const filename = `${Date.now()}_${crypto.randomUUID().slice(0, 8)}${ext}`;
	await fs.writeFile(path.join(UPLOADS_DIR, filename), file.data);

	return `/uploads/${filename}`;
}

function parseMultipart(req) {
	return new Promise((resolve, reject) => {
		const contentType = req.headers["content-type"] || "";
		const boundaryValue = contentType.match(/boundary=(.+)$/)?.[1];

		if (!contentType.includes("multipart/form-data") || !boundaryValue) {
			return reject(new Error("Request must be multipart/form-data"));
		}

		const chunks = [];

		req.on("data", chunk => chunks.push(chunk));
		req.on("error", reject);

		req.on("end", () => {
			const boundary = `--${boundaryValue}`;
			const body = Buffer.concat(chunks).toString("binary");
			const parts = body.split(boundary);

			const fields = {};
			const files = [];

			for (const part of parts) {
				if (!part.includes("Content-Disposition")) continue;

				const name = part.match(/name="([^"]+)"/)?.[1];
				const filename = part.match(/filename="([^"]*)"/)?.[1];
				const splitIndex = part.indexOf("\r\n\r\n");

				if (!name || splitIndex === -1) continue;

				let content = part.slice(splitIndex + 4);
				content = content.slice(0, content.lastIndexOf("\r\n"));

				if (filename) {
					files.push({
						fieldName: name,
						filename,
						data: Buffer.from(content, "binary")
					});
				} else {
					fields[name] = content;
				}
			}

			resolve({ fields, files });
		});
	});
}

async function getRequestData(req) {
	const contentType = req.headers["content-type"] || "";

	if (contentType.includes("multipart/form-data")) {
		return parseMultipart(req);
	}

	return {
		fields: req.body || {},
		files: []
	};
}

async function saveUploadedImages(files) {
	const imageUrls = [];

	for (const file of files) {
		if (file.fieldName === "image") {
			imageUrls.push(await writeImage(file));
		}
	}

	return imageUrls;
}

function distanceMeters(lat1, lng1, lat2, lng2) {
	const R = 6371000;
	const a = lat1 * Math.PI / 180;
	const b = lat2 * Math.PI / 180;
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLng = (lng2 - lng1) * Math.PI / 180;

	const x =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(a) * Math.cos(b) *
		Math.sin(dLng / 2) ** 2;

	return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

async function getClosestEvent(lat, lng) {
	const userLat = toNumber(lat);
	const userLng = toNumber(lng);

	if (userLat === null || userLng === null) return null;

	const events = await getUpcomingEvents();

	let closestEvent = null;
	let closestDistance = Infinity;

	for (const event of events) {
		const eventLat = toNumber(event.lat);
		const eventLng = toNumber(event.lng);

		if (eventLat === null || eventLng === null) continue;

		const distance = distanceMeters(userLat, userLng, eventLat, eventLng);

		if (distance < closestDistance) {
			closestDistance = distance;
			closestEvent = event;
		}
	}

	return closestEvent && closestDistance <= MOTION_EVENT_RANGE ? closestEvent : null;
}

function cleanupMotion() {
	const now = Date.now();

	for (const eventKey of Object.keys(motionByEvent)) {
		for (const deviceId of Object.keys(motionByEvent[eventKey])) {
			if (now - motionByEvent[eventKey][deviceId].time > MOTION_WINDOW_MS) {
				delete motionByEvent[eventKey][deviceId];
			}
		}

		if (!Object.keys(motionByEvent[eventKey]).length) {
			delete motionByEvent[eventKey];
		}
	}
}

function runMotionScore(data) {
	return new Promise((resolve, reject) => {
		const python = spawn(process.env.PYTHON || "python", ["calc.py"]);

		let output = "";
		let error = "";

		const timer = setTimeout(() => {
			python.kill();
			reject(new Error("Python timed out"));
		}, 10_000);

		python.stdout.on("data", chunk => output += chunk.toString());
		python.stderr.on("data", chunk => error += chunk.toString());
		python.on("error", reject);

		python.on("close", code => {
			clearTimeout(timer);

			if (code !== 0) {
				return reject(new Error(error || `Python exited with code ${code}`));
			}

			try {
				resolve(JSON.parse(output));
			} catch {
				reject(new Error(`Python returned invalid JSON: ${output}`));
			}
		});

		python.stdin.write(JSON.stringify(data));
		python.stdin.end();
	});
}

app.get("/server/getevent/:key", asyncRoute(async (req, res) => {
	const event = await readEvent(req.params.key);

	if (!event) {
		return fail(res, 404, "Event not found");
	}

	ok(res, event);
}));

app.get("/server/events", asyncRoute(async (req, res) => {
	ok(res, await getUpcomingEvents());
}));

app.post("/server/addevent", asyncRoute(async (req, res) => {
	const { fields, files } = await getRequestData(req);

	const lat = toNumber(fields.lat);
	const lng = toNumber(fields.lng);

	if (lat === null || lng === null) {
		return fail(res, 400, "Missing or invalid latitude/longitude");
	}

	const event = {
		artistName: fields.artistName,
		genre: fields.genre,
		locationName: fields.locationName,
		lat,
		lng,
		time: Math.floor(Date.now() / 1000),
		tags: parseTags(fields.tags),
		images: await saveUploadedImages(files)
	};

	const key = getKey(event);
	await writeEvent(key, event);

	ok(res, { message: "Event added successfully", key, event }, 201);
}));

app.post("/server/editevent/:key", asyncRoute(async (req, res) => {
	const key = req.params.key;
	const oldEvent = await readEvent(key);

	if (!oldEvent) {
		return fail(res, 404, "Event not found");
	}

	const { fields, files } = await getRequestData(req);
	const imageUrls = await saveUploadedImages(files);

	const updatedEvent = {
		...oldEvent,
		artistName: fields.artistName ?? oldEvent.artistName,
		genre: fields.genre ?? oldEvent.genre,
		locationName: fields.locationName ?? oldEvent.locationName,
		tags: parseTags(fields.tags, oldEvent.tags || []),
		images: [...(oldEvent.images || []), ...imageUrls],
		lat: oldEvent.lat,
		lng: oldEvent.lng,
		time: oldEvent.time
	};

	await writeEvent(key, updatedEvent);

	ok(res, { message: "Event updated successfully", key, event: updatedEvent });
}));

app.post("/server/motion", asyncRoute(async (req, res) => {
	console.log("POST motion");
	const { lat, lng, motion, deviceId } = req.body;

	if (lat === undefined || lng === undefined || !motion || !deviceId) {
		return fail(res, 400, "Missing lat, lng, motion, or deviceId");
	}

	const closestEvent = await getClosestEvent(lat, lng);

	if (!closestEvent) {
		return fail(res, 404, "No nearby event");
	}

	const key = closestEvent.key;

	motionByEvent[key] ??= {};
	motionByEvent[key][deviceId] = {
		deviceId,
		motion,
		time: Date.now()
	};

	ok(res, { saved: true, event_key: key });
}));

// DBG
app.get("/server/motionsettest", asyncRoute(async (req, res) => {
	console.log("GET motiontest");
	const { lat, lng } = req.query;

	if (lat === undefined || lng === undefined) {
		return fail(res, 400, "Missing lat, lng");
	}

	const closestEvent = await getClosestEvent(lat, lng);

	if (!closestEvent) {
		return fail(res, 404, "No nearby event");
	}

	const key = closestEvent.key;

	motionByEvent[key] ??= {};
	const uuid = Math.random() + " TEST";
	console.log(uuid);
	motionByEvent[key][uuid] = {
		deviceId: uuid,
		motion: [2,2,2],
		time: Date.now()
	};

	ok(res, { saved: true, event_key: key });
}));

app.get("/server/getscores", asyncRoute(async (req, res) => {
	console.log("GET getscores");
	cleanupMotion();

	const events = await getUpcomingEvents();

	const scoreEntries = await Promise.all(events.map(async event => {
		const devices = Object.values(motionByEvent[event.key] || {}).map(({ deviceId, motion }) => ({
			deviceId,
			motion
		}));

		if (!devices.length) {
			return [event.key, 0];
		}
		console.log(event.key);
		console.log(devices);
		try {
			const result = await runMotionScore({ event_key: event.key, devices });
			return [event.key, result.score || 0];
		} catch {
			return [event.key, 0];
		}
	}));

	ok(res, Object.fromEntries(scoreEntries));
}));

// DBG
app.get("/accel", (req, res) => {
	res.sendFile(path.join(__dirname, "accel.html"));
});

ensureDirs().then(() => {
	app.listen(PORT, "0.0.0.0", () => {
		console.log(`Server running on port ${PORT}`);
	});
});