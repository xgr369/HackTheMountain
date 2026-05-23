// Montreal starting point
const montreal = [45.5017, -73.5673];

// Create map
const map = L.map("map").setView(montreal, 13);

// Add map design
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap"
}).addTo(map);

// Demo event data
let events = [
  {
    id: 1,
    artistName: "Alex Guitar",
    genre: "Music",
    locationName: "Place des Arts",
    time: "Today 6 PM",
    liveLink: "https://youtube.com",
    lat: 45.5088,
    lng: -73.5662,
    interested: 24
  },
  {
    id: 2,
    artistName: "Street Theatre Crew",
    genre: "Theatre",
    locationName: "Old Port",
    time: "Today 7 PM",
    liveLink: "https://twitch.tv",
    lat: 45.5075,
    lng: -73.5530,
    interested: 15
  }
];

let markers = [];

// Show all events on map and list
function renderEvents() {
  // Remove old markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  events.forEach(event => {
    // Create map marker
    const marker = L.marker([event.lat, event.lng])
      .addTo(map)
      .bindPopup(`
        <strong>${event.artistName}</strong><br>
        Genre: ${event.genre}<br>
        Location: ${event.locationName}<br>
        Time: ${event.time}<br>
        Interested: ${event.interested}<br>
        <a href="${event.liveLink}" target="_blank">Watch Live</a>
      `);

    markers.push(marker);

    // Create event card
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <h3>${event.artistName}</h3>
      <p><strong>Genre:</strong> ${event.genre}</p>
      <p><strong>Location:</strong> ${event.locationName}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Interested:</strong> <span id="interest-${event.id}">${event.interested}</span></p>
      <button class="interested-btn" onclick="addInterest(${event.id})">
        I'm Interested
      </button>
    `;

    eventList.appendChild(card);
  });
}

// Create a new event from form
function createEvent() {
  const artistName = document.getElementById("artistName").value;
  const genre = document.getElementById("genre").value;
  const locationName = document.getElementById("locationName").value;
  const time = document.getElementById("time").value;
  const liveLink = document.getElementById("liveLink").value;

  if (!artistName || !genre || !locationName || !time) {
    alert("Please fill in artist name, genre, location, and time.");
    return;
  }

  const randomLat = 45.5017 + (Math.random() - 0.5) * 0.04;
  const randomLng = -73.5673 + (Math.random() - 0.5) * 0.04;

  const newEvent = {
    id: Date.now(),
    artistName,
    genre,
    locationName,
    time,
    liveLink: liveLink || "#",
    lat: randomLat,
    lng: randomLng,
    interested: 0
  };

  events.push(newEvent);

  document.getElementById("artistName").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("locationName").value = "";
  document.getElementById("time").value = "";
  document.getElementById("liveLink").value = "";

  renderEvents();
}

// Add interest to event
function addInterest(eventId) {
  const event = events.find(item => item.id === eventId);

  if (event) {
    event.interested++;
    renderEvents();
  }
}

// Start app
renderEvents();
