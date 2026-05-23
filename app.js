// ─────────────────────────────────────────────
//  Montreal Music Taste Data by Neighbourhood
// ─────────────────────────────────────────────

const genreColors = {
  "Hip-Hop":    "#f59e0b",
  "Jazz/Blues": "#8b5cf6",
  "Indie/Alt":  "#ec4899",
  "Electronic": "#06b6d4",
  "Classical":  "#10b981",
  "Folk/World": "#f97316",
  "Pop":        "#3b82f6",
  "Rock":       "#ef4444"
};

// Real Montreal boroughs with approximate GeoJSON-style polygons
// and music taste data based on each area's cultural character
const neighbourhoods = [
  {
    name: "Le Plateau-Mont-Royal",
    topGenre: "Indie/Alt",
    genres: { "Indie/Alt": 38, "Folk/World": 22, "Jazz/Blues": 18, "Hip-Hop": 10, "Pop": 8, "Electronic": 4 },
    description: "Bohemian heart of MTL — indie, folk & jazz cafés everywhere.",
    venues: ["Casa del Popolo", "Sala Rossa", "L'Escogriffe"],
    center: [45.5195, -73.5810],
    polygon: [
      [45.5090, -73.5680], [45.5090, -73.6020], [45.5310, -73.6020],
      [45.5310, -73.5680], [45.5090, -73.5680]
    ]
  },
  {
    name: "Mile End",
    topGenre: "Indie/Alt",
    genres: { "Indie/Alt": 32, "Electronic": 25, "Folk/World": 20, "Jazz/Blues": 12, "Hip-Hop": 8, "Pop": 3 },
    description: "Creative hub — record labels, studios, experimental sounds.",
    venues: ["Phi Centre", "Ausgang Plaza", "Bar Le Ritz PDB"],
    center: [45.5280, -73.5990],
    polygon: [
      [45.5200, -73.5870], [45.5200, -73.6100], [45.5380, -73.6100],
      [45.5380, -73.5870], [45.5200, -73.5870]
    ]
  },
  {
    name: "Old Montreal",
    topGenre: "Jazz/Blues",
    genres: { "Jazz/Blues": 35, "Classical": 28, "Folk/World": 18, "Pop": 12, "Rock": 5, "Indie/Alt": 2 },
    description: "Tourism & culture hub — jazz festivals, buskers, classical concerts.",
    venues: ["Place Jacques-Cartier", "Centaur Theatre", "Terrasse Bonsecours"],
    center: [45.5075, -73.5540],
    polygon: [
      [45.5020, -73.5480], [45.5020, -73.5640], [45.5140, -73.5640],
      [45.5140, -73.5480], [45.5020, -73.5480]
    ]
  },
  {
    name: "Downtown / Ville-Marie",
    topGenre: "Pop",
    genres: { "Pop": 30, "Electronic": 25, "Hip-Hop": 20, "Rock": 12, "Jazz/Blues": 8, "Classical": 5 },
    description: "High-traffic commercial core — mainstream pop & club sounds dominate.",
    venues: ["Bell Centre", "Place des Arts", "Metropolis"],
    center: [45.5088, -73.5700],
    polygon: [
      [45.4980, -73.5550], [45.4980, -73.5870], [45.5190, -73.5870],
      [45.5190, -73.5550], [45.4980, -73.5550]
    ]
  },
  {
    name: "Rosemont–La Petite-Patrie",
    topGenre: "Hip-Hop",
    genres: { "Hip-Hop": 34, "Electronic": 24, "Indie/Alt": 18, "Pop": 14, "Rock": 6, "Folk/World": 4 },
    description: "Young & multicultural — hip-hop beats and electronic nights.",
    venues: ["Théâtre Fairmount", "Quai des Brumes", "L'Esco"],
    center: [45.5400, -73.5700],
    polygon: [
      [45.5300, -73.5500], [45.5300, -73.6000], [45.5550, -73.6000],
      [45.5550, -73.5500], [45.5300, -73.5500]
    ]
  },
  {
    name: "Hochelaga-Maisonneuve",
    topGenre: "Rock",
    genres: { "Rock": 35, "Hip-Hop": 28, "Electronic": 18, "Indie/Alt": 12, "Pop": 5, "Folk/World": 2 },
    description: "Gritty & authentic — rock venues, underground hip-hop & punk.",
    venues: ["Théâtre Corona", "Brasserie Beaubien", "O Patro Vys"],
    center: [45.5470, -73.5360],
    polygon: [
      [45.5350, -73.5180], [45.5350, -73.5560], [45.5620, -73.5560],
      [45.5620, -73.5180], [45.5350, -73.5180]
    ]
  },
  {
    name: "Outremont",
    topGenre: "Classical",
    genres: { "Classical": 40, "Jazz/Blues": 25, "Folk/World": 18, "Indie/Alt": 10, "Pop": 5, "Rock": 2 },
    description: "Affluent & cultured — classical concerts, opera & world music.",
    venues: ["Outremont Theatre", "Église Saint-Viateur", "Rialto Theatre"],
    center: [45.5230, -73.6110],
    polygon: [
      [45.5140, -73.5980], [45.5140, -73.6260], [45.5340, -73.6260],
      [45.5340, -73.5980], [45.5140, -73.5980]
    ]
  },
  {
    name: "Saint-Laurent",
    topGenre: "Electronic",
    genres: { "Electronic": 36, "Hip-Hop": 26, "Pop": 18, "Rock": 10, "Folk/World": 6, "Indie/Alt": 4 },
    description: "Industrial turned creative — electronic & hip-hop thrive here.",
    venues: ["Club Soda", "L'Astral", "Studio TD"],
    center: [45.5130, -73.6550],
    polygon: [
      [45.4950, -73.6350], [45.4950, -73.6800], [45.5350, -73.6800],
      [45.5350, -73.6350], [45.4950, -73.6350]
    ]
  },
  {
    name: "NDG / Notre-Dame-de-Grâce",
    topGenre: "Folk/World",
    genres: { "Folk/World": 32, "Rock": 24, "Jazz/Blues": 20, "Indie/Alt": 14, "Classical": 6, "Pop": 4 },
    description: "Multicultural & laid-back — world music, folk & rock coffee shops.",
    venues: ["Théâtre Déjà Vu", "The Burgundy Lion", "Bar Vintage"],
    center: [45.4820, -73.6350],
    polygon: [
      [45.4650, -73.6100], [45.4650, -73.6600], [45.5050, -73.6600],
      [45.5050, -73.6100], [45.4650, -73.6100]
    ]
  },
  {
    name: "Verdun",
    topGenre: "Rock",
    genres: { "Rock": 38, "Folk/World": 22, "Indie/Alt": 18, "Hip-Hop": 12, "Electronic": 6, "Pop": 4 },
    description: "Up-and-coming riverside community — indie rock & folk scene growing fast.",
    venues: ["Théâtre Verre Bouteille", "Wellington Street strip"],
    center: [45.4650, -73.5680],
    polygon: [
      [45.4480, -73.5480], [45.4480, -73.5950], [45.4820, -73.5950],
      [45.4820, -73.5480], [45.4480, -73.5480]
    ]
  }
];

// ─────────────────────────────────────────────
//  Map Setup
// ─────────────────────────────────────────────

const montreal = [45.5017, -73.5673];
const map = L.map("map").setView(montreal, 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap",
  opacity: 0.6
}).addTo(map);

// ─────────────────────────────────────────────
//  Draw Neighbourhood Zones
// ─────────────────────────────────────────────

let zoneLayer = L.layerGroup().addTo(map);

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

function drawNeighbourhoodZones() {
  zoneLayer.clearLayers();
  neighbourhoods.forEach(n => {
    const color = genreColors[n.topGenre];
    const topPct = n.genres[n.topGenre];

    const poly = L.polygon(n.polygon, {
      color: color,
      fillColor: color,
      fillOpacity: 0.28,
      weight: 2,
      dashArray: "4 2"
    });

    const genreRows = Object.entries(n.genres)
      .sort((a,b) => b[1]-a[1])
      .slice(0,4)
      .map(([g, pct]) => `
        <div class="genre-row">
          <span class="genre-dot" style="background:${genreColors[g]}"></span>
          <span class="genre-name">${g}</span>
          <div class="genre-bar-wrap">
            <div class="genre-bar" style="width:${pct}%;background:${genreColors[g]}"></div>
          </div>
          <span class="genre-pct">${pct}%</span>
        </div>`).join("");

    const venueList = n.venues.map(v => `<span class="venue-tag">${v}</span>`).join("");

    poly.bindPopup(`
      <div class="zone-popup">
        <div class="zone-header" style="border-left:4px solid ${color}">
          <strong>${n.name}</strong>
          <span class="top-badge" style="background:${color}">${n.topGenre}</span>
        </div>
        <p class="zone-desc">${n.description}</p>
        <div class="genre-chart">${genreRows}</div>
        <div class="venue-list"><strong>🎤 Venues:</strong><br>${venueList}</div>
      </div>
    `, { maxWidth: 320 });

    poly.on("mouseover", () => {
      poly.setStyle({ fillOpacity: 0.5, weight: 3 });
      highlightNeighbourhood(n.name);
    });
    poly.on("mouseout", () => {
      poly.setStyle({ fillOpacity: 0.28, weight: 2 });
      clearHighlight();
    });
    poly.on("click", () => {
      showNeighbourhoodDetail(n);
    });

    zoneLayer.addLayer(poly);

    // Label in the center
    const label = L.divIcon({
      className: "zone-label",
      html: `<div style="border-color:${color};color:${color}"><span>${n.topGenre}</span></div>`,
      iconSize: [0, 0]
    });
    L.marker(n.center, { icon: label, interactive: false }).addTo(zoneLayer);
  });
}

// ─────────────────────────────────────────────
//  Neighbourhood Detail Panel
// ─────────────────────────────────────────────

function showNeighbourhoodDetail(n) {
  const panel = document.getElementById("neighbourhoodDetail");
  const color = genreColors[n.topGenre];

  const genreRows = Object.entries(n.genres)
    .sort((a,b) => b[1]-a[1])
    .map(([g, pct]) => `
      <div class="detail-genre-row">
        <div class="detail-genre-label">
          <span class="genre-dot" style="background:${genreColors[g]}"></span>
          ${g}
        </div>
        <div class="detail-bar-wrap">
          <div class="detail-bar" style="width:${pct}%;background:${genreColors[g]};--target:${pct}%"></div>
        </div>
        <span class="detail-pct">${pct}%</span>
      </div>`).join("");

  const venueItems = n.venues.map(v => `<li>${v}</li>`).join("");

  panel.innerHTML = `
    <div class="detail-header" style="background:${color}22;border-left:4px solid ${color}">
      <div>
        <div class="detail-name">${n.name}</div>
        <div class="detail-top">🎵 Top genre: <strong>${n.topGenre}</strong></div>
      </div>
      <button class="close-detail" onclick="closeDetail()">✕</button>
    </div>
    <p class="detail-desc">${n.description}</p>
    <div class="detail-section">
      <div class="section-title">Music Taste Breakdown</div>
      ${genreRows}
    </div>
    <div class="detail-section">
      <div class="section-title">🎤 Where to Perform</div>
      <ul class="venue-list-ul">${venueItems}</ul>
    </div>
    <button class="perform-here-btn" style="background:${color}" onclick="filterEventsByArea('${n.name}')">
      🎸 Find Events in This Area
    </button>
  `;
  panel.classList.add("visible");
}

function closeDetail() {
  document.getElementById("neighbourhoodDetail").classList.remove("visible");
}

function highlightNeighbourhood(name) {
  document.querySelectorAll(".hood-card").forEach(c => {
    c.classList.toggle("hovered", c.dataset.name === name);
  });
}

function clearHighlight() {
  document.querySelectorAll(".hood-card").forEach(c => c.classList.remove("hovered"));
}

// ─────────────────────────────────────────────
//  Neighbourhood List (sidebar)
// ─────────────────────────────────────────────

function renderNeighbourhoodList() {
  const container = document.getElementById("hoodList");
  container.innerHTML = neighbourhoods.map(n => {
    const color = genreColors[n.topGenre];
    const top3 = Object.entries(n.genres).sort((a,b) => b[1]-a[1]).slice(0,3);
    return `
      <div class="hood-card" data-name="${n.name}"
        onclick="flyToNeighbourhood('${n.name}')"
        style="border-left: 4px solid ${color}">
        <div class="hood-top">
          <span class="hood-name">${n.name}</span>
          <span class="hood-badge" style="background:${color}">${n.topGenre}</span>
        </div>
        <div class="hood-bars">
          ${top3.map(([g,p]) => `
            <div class="mini-bar-row">
              <span class="mini-label">${g}</span>
              <div class="mini-bar-bg">
                <div class="mini-bar" style="width:${p}%;background:${color}88"></div>
              </div>
            </div>`).join("")}
        </div>
      </div>`;
  }).join("");
}

function flyToNeighbourhood(name) {
  const n = neighbourhoods.find(x => x.name === name);
  if (!n) return;
  map.flyTo(n.center, 14, { duration: 1 });
  setTimeout(() => showNeighbourhoodDetail(n), 600);
}

// ─────────────────────────────────────────────
//  Legend
// ─────────────────────────────────────────────

function renderLegend() {
  const el = document.getElementById("genreLegend");
  el.innerHTML = Object.entries(genreColors).map(([g, c]) => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${c}"></span>
      <span>${g}</span>
    </div>`).join("");
}

// ─────────────────────────────────────────────
//  Events (existing functionality preserved)
// ─────────────────────────────────────────────

let events = [
  {
    id: 1,
    artistName: "Alex Guitar",
    genre: "Jazz/Blues",
    locationName: "Place des Arts",
    time: "Today 6 PM",
    liveLink: "https://youtube.com",
    lat: 45.5088,
    lng: -73.5662,
    interested: 24,
    neighbourhood: "Downtown / Ville-Marie"
  },
  {
    id: 2,
    artistName: "Street Theatre Crew",
    genre: "Folk/World",
    locationName: "Old Port",
    time: "Today 7 PM",
    liveLink: "https://twitch.tv",
    lat: 45.5075,
    lng: -73.5530,
    interested: 15,
    neighbourhood: "Old Montreal"
  },
  {
    id: 3,
    artistName: "Club Nuit MTL",
    genre: "Electronic",
    locationName: "Saint-Laurent Blvd",
    time: "Tonight 10 PM",
    liveLink: "https://twitch.tv",
    lat: 45.5130,
    lng: -73.6550,
    interested: 41,
    neighbourhood: "Saint-Laurent"
  }
];

let eventMarkers = [];
let activeFilter = null;

function getGenreIcon(genre) {
  const icons = {
    "Hip-Hop": "🎤", "Jazz/Blues": "🎷", "Indie/Alt": "🎸",
    "Electronic": "🎹", "Classical": "🎻", "Folk/World": "🪗",
    "Pop": "🎵", "Rock": "🥁", "Music": "🎵", "Theatre": "🎭",
    "Dance": "💃"
  };
  return icons[genre] || "🎵";
}

function renderEvents(filterNeighbourhood = null) {
  eventMarkers.forEach(m => map.removeLayer(m));
  eventMarkers = [];

  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  const filtered = filterNeighbourhood
    ? events.filter(e => e.neighbourhood === filterNeighbourhood)
    : events;

  if (filtered.length === 0) {
    eventList.innerHTML = `<p class="no-events">No events in this area yet.<br>Be the first to perform here!</p>`;
    return;
  }

  filtered.forEach(event => {
    const color = genreColors[event.genre] || "#6b7280";

    const marker = L.circleMarker([event.lat, event.lng], {
      radius: 10,
      fillColor: color,
      color: "white",
      weight: 2,
      fillOpacity: 0.9
    }).addTo(map).bindPopup(`
      <div class="event-popup">
        <strong>${getGenreIcon(event.genre)} ${event.artistName}</strong><br>
        <span style="color:${color}">${event.genre}</span><br>
        📍 ${event.locationName}<br>
        🕐 ${event.time}<br>
        👥 ${event.interested} interested<br>
        <a href="${event.liveLink}" target="_blank">▶ Watch Live</a>
      </div>
    `);

    eventMarkers.push(marker);

    const card = document.createElement("div");
    card.className = "event-card";
    card.style.borderLeft = `4px solid ${color}`;

    card.innerHTML = `
      <div class="event-card-top">
        <span class="event-icon">${getGenreIcon(event.genre)}</span>
        <div>
          <h3>${event.artistName}</h3>
          <span class="event-genre-badge" style="background:${color}22;color:${color}">${event.genre}</span>
        </div>
      </div>
      <p>📍 ${event.locationName}</p>
      <p>🕐 ${event.time}</p>
      <p>👥 <span id="interest-${event.id}">${event.interested}</span> interested</p>
      <div class="event-actions">
        <button class="interested-btn" onclick="addInterest(${event.id})" style="background:${color}">
          ★ Interested
        </button>
        ${event.liveLink !== "#" ? `<a href="${event.liveLink}" target="_blank" class="watch-btn">▶ Live</a>` : ""}
      </div>
    `;
    eventList.appendChild(card);
  });
}

function filterEventsByArea(neighbourhood) {
  activeFilter = neighbourhood;
  document.getElementById("eventsTitle").textContent = neighbourhood;
  document.getElementById("clearFilter").style.display = "inline-block";
  renderEvents(neighbourhood);
  document.getElementById("eventsPanel").scrollIntoView({ behavior: "smooth" });
}

function clearEventFilter() {
  activeFilter = null;
  document.getElementById("eventsTitle").textContent = "Live Events";
  document.getElementById("clearFilter").style.display = "none";
  renderEvents();
}

function addInterest(eventId) {
  const event = events.find(e => e.id === eventId);
  if (event) {
    event.interested++;
    renderEvents(activeFilter);
  }
}

function createEvent() {
  const artistName = document.getElementById("artistName").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const locationName = document.getElementById("locationName").value.trim();
  const time = document.getElementById("time").value.trim();
  const liveLink = document.getElementById("liveLink").value.trim();
  const hood = document.getElementById("neighbourhoodSelect").value;

  if (!artistName || !genre || !locationName || !time || !hood) {
    alert("Please fill in all required fields including neighbourhood.");
    return;
  }

  const n = neighbourhoods.find(x => x.name === hood);
  const jitter = () => (Math.random() - 0.5) * 0.012;
  const lat = n ? n.center[0] + jitter() : 45.5017 + jitter();
  const lng = n ? n.center[1] + jitter() : -73.5673 + jitter();

  const newEvent = {
    id: Date.now(),
    artistName, genre, locationName, time,
    liveLink: liveLink || "#",
    lat, lng,
    interested: 0,
    neighbourhood: hood
  };

  events.push(newEvent);

  ["artistName","genre","locationName","time","liveLink"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("neighbourhoodSelect").value = "";

  renderEvents(activeFilter);

  map.flyTo([lat, lng], 15, { duration: 1.2 });

  // Flash confirmation
  const btn = document.querySelector(".create-btn");
  btn.textContent = "✓ Event Created!";
  btn.style.background = "#10b981";
  setTimeout(() => { btn.textContent = "Create Event"; btn.style.background = ""; }, 2000);
}

// ─────────────────────────────────────────────
//  Genre Filter Tabs
// ─────────────────────────────────────────────

function renderGenreTabs() {
  const container = document.getElementById("genreTabs");
  const all = ["All", ...Object.keys(genreColors)];
  container.innerHTML = all.map(g => `
    <button class="genre-tab ${g==="All"?"active":""}"
      style="${g!=="All"?`--gc:${genreColors[g]}`:"--gc:#6b7280"}"
      onclick="filterByGenre('${g}', this)">${g === "All" ? "All" : getGenreIcon(g)+" "+g}</button>
  `).join("");
}

function filterByGenre(genre, btn) {
  document.querySelectorAll(".genre-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  if (genre === "All") {
    zoneLayer.eachLayer(l => {
      if (l.setStyle) l.setStyle({ fillOpacity: 0.28, opacity: 1 });
    });
  } else {
    zoneLayer.eachLayer(l => {
      if (!l.setStyle) return;
      // We need to find which neighbourhood this polygon belongs to
      // Use the bound popup content to match
    });
    // Highlight matching neighbourhoods
    neighbourhoods.forEach(n => {
      // done via opacity in the hood cards
    });
    document.querySelectorAll(".hood-card").forEach(card => {
      const n = neighbourhoods.find(x => x.name === card.dataset.name);
      card.style.opacity = (!n || n.topGenre === genre) ? "1" : "0.35";
    });
  }
}

// ─────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────

function populateNeighbourhoodSelect() {
  const sel = document.getElementById("neighbourhoodSelect");
  sel.innerHTML = `<option value="">Select neighbourhood...</option>` +
    neighbourhoods.map(n => `<option value="${n.name}">${n.name} (${n.topGenre})</option>`).join("");
}

function init() {
  drawNeighbourhoodZones();
  renderNeighbourhoodList();
  renderLegend();
  renderEvents();
  renderGenreTabs();
  populateNeighbourhoodSelect();
}

init();
