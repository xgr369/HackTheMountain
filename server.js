/*
PLAN:
 - Backend entry point.
 - Receives event requests.
 - Saves events into local files.
 - Can fetch one event or list upcoming events.
*/

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const EVENTS_DIR = path.join(__dirname, "storage", "events");

function getKey(json) {
	if (json.lat === undefined || json.lng === undefined || json.time === undefined) {
		throw new Error("invalid fields");
	}

	const unique = crypto.randomUUID().slice(0, 8);

	return `${json.lat}_${json.lng}_${json.time}_${unique}`;
}

async function readEvent(key) {
	try {
		console.log(`CALL readEvent ${key}`);

		const filePath = path.join(EVENTS_DIR, key);
		const data = await fs.readFile(filePath, "utf8");

		return JSON.parse(data);
	} catch (err) {
		console.error("Event not found:", err.message);
		return null;
	}
}

async function writeEvent(key, json) {
	await fs.mkdir(EVENTS_DIR, { recursive: true });

	const filePath = path.join(EVENTS_DIR, key);

	await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf8");

	console.log(`CALL writeEvent ${key}`);
}

async function readAllEvents() {
	try {
		await fs.mkdir(EVENTS_DIR, { recursive: true });

		const files = await fs.readdir(EVENTS_DIR);
		const events = [];

		for (const file of files) {
			const event = await readEvent(file);

			if (event) {
				events.push({
					key: file,
					...event
				});
			}
		}

		return events;
	} catch (err) {
		console.error(err);
		return [];
	}
}

// GET one event
// Example: /server/getevent/120391-2309102-312
// Returns 404 for key not found
app.get("/server/getevent/:key", async (req, res) => {
	const key = req.params.key;

	if (!key) {
		return res.status(400).json({
			error: "Missing event key"
		});
	}

	const data = await readEvent(key);

	if (!data) {
		return res.status(404).json({
			error: "Event not found"
		});
	}

	res.json(data);
});

// GET today's events, with respective keys
app.get("/server/events", async (req, res) => {
	const events = await readAllEvents();

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const todayUnix = Math.floor(today.getTime() / 1000);

	const upcomingEvents = events
		.filter(event => event.time >= todayUnix)
		.sort((a, b) => a.time - b.time);

	res.json(upcomingEvents);
});

// POST add event
// Example body:
// {
//   "artistName": "Bob",
//	 "genre": "Reggae",
//   "locationName": "Old Port",
//   "lat": -127
//	 "lng": 128
//	 "time"
//   "tags": ["music", "street"],
//   "media": ["image.jpg"]
// }
app.post("/server/addevent", async (req, res) => {
	const body = req.body;

	if (!body || body.lat === undefined || body.lng === undefined) {
		return res.status(400).json({
			error: "Missing required fields"
		});
	}

	const { artistName, genre, locationName, lat, lng, tags, media } = body;

	const json = {
		artistName: artistName,
		genre: genre,
		locationName: locationName,
		lat: lat,
		lng: lng,
	    time: Math.floor(Date.now() / 1000),
		tags: tags || [],
		media: media || [],
	};
	
	try {
		const key = getKey(json);
		
		await writeEvent(key, json);

		console.log("POST addevent");

		res.status(201).json({
			message: "Event added successfully",
			key,
			event: json
		});
	} catch (err) {
		res.status(400).json({
			message: "Could not add event",
			key,
			event: json
		});
	}
});

// POST edit event (non-essential fields only)
//  {
//   "artistName": "DJ Mike",
//   "genre": "Hip-Hop",
//   "locationName": "Downtown Montreal",
//   "tags": ["rap", "live"],
//   "media": ["new-image.jpg"]
// }
app.post("/server/editevent/:key", async (req, res) => {
	const key = req.params.key;
	const body = req.body;

	try {
		const oldEvent = await readEvent(key);

		const updatedEvent = {
			...oldEvent,

			// editable fields only
			artistName: body.artistName ?? oldEvent.artistName,
			genre: body.genre ?? oldEvent.genre,
			locationName: body.locationName ?? oldEvent.locationName,
			tags: body.tags ?? oldEvent.tags,
			media: body.media ?? oldEvent.media,

			// locked essential fields
			lat: oldEvent.lat,
			lng: oldEvent.lng,
			time: oldEvent.time,
		};

		await writeEvent(key, updatedEvent);

		res.json({
			message: "Event updated successfully",
			key,
			event: updatedEvent
		});
	} catch (err) {
		res.status(404).json({
			error: "Event not found or could not be updated"
		});
	}
});

function main() {
	const PORT = 999;

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

main();
