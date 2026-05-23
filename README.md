# Rhythm Analysis Server

Detects crowd synchronization in real-time using motion sensor data from smartphones.

## What it does

Receives accelerometer data from multiple smartphones, computes how synchronized their movements are using DTW + DBSCAN, and returns a score representing the crowd's energy at a given location.

## How it works

1. Each phone sends its motion data (magnitude of acceleration) to the server
2. DTW (Dynamic Time Warping) computes similarity between all devices across all locations
3. DBSCAN clusters devices with similar motion patterns
4. Score = `participant_count × avg_magnitude × sync_rate`

The key insight: devices at the same location that move in sync score higher. A crowd of 10 people all nodding to the same beat scores much higher than 2 people.

## Setup

```bash
pip install fastapi uvicorn dtaidistance scikit-learn numpy
```

## Run

```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

API docs available at `http://localhost:8000/docs`

## API

### `POST /api/motion`

```json
{
  "device_id": "uuid",
  "location_id": "metro_mont_royal",
  "interval_ms": 100,
  "samples": [9.8, 10.2, 9.9, 10.5, ...]
}
```

- `device_id`: unique identifier for the device
- `location_id`: where the performance is happening
- `interval_ms`: sampling interval in milliseconds
- `samples`: array of acceleration magnitudes (`√(x²+y²+z²)`) collected on the client

### Response

```json
{
  "score": 0.917,
  "participant_count": 5,
  "sync_rate": 1.0
}
```

- `score`: overall energy score for this location (higher = more people moving together)
- `participant_count`: number of active devices at this location
- `sync_rate`: fraction of participants in sync (0.0–1.0)

## Client-side data collection

```javascript
const samples = [];
const startTime = Date.now();

window.addEventListener('devicemotion', (e) => {
  const x = e.accelerationIncludingGravity.x;
  const y = e.accelerationIncludingGravity.y;
  const z = e.accelerationIncludingGravity.z;
  samples.push(Math.sqrt(x**2 + y**2 + z**2));
});

// Send every 5 seconds
setInterval(() => {
  fetch('/api/motion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      device_id: deviceId,
      location_id: locationId,
      interval_ms: 100,
      samples: [...samples]
    })
  });
  samples.length = 0;
}, 5000);
```

> **Note:** iOS requires user permission for DeviceMotion. Use `DeviceMotionEvent.requestPermission()` before listening.

## Notes

- Data older than 30 seconds is automatically discarded
- Minimum 2 devices required at a location to compute a score
- DTW handles different-length sample arrays naturally (no padding needed)
- `eps` for DBSCAN is set dynamically based on the median DTW distance
