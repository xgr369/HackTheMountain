from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from dtaidistance import dtw
from sklearn.cluster import DBSCAN
import time

app = FastAPI()

store = {}
WINDOW_SECONDS = 30

class MotionData(BaseModel):
    device_id: str
    location_id: str
    interval_ms: int
    samples: list[float]

def remove_gravity(samples):
    mean = np.mean(samples)
    return [s - mean for s in samples]

def resample(samples, interval_ms, target_interval_ms=100):
    if interval_ms == target_interval_ms:
        return samples
    ratio = interval_ms / target_interval_ms
    indices = [int(i * ratio) for i in range(int(len(samples) / ratio))]
    return [samples[i] for i in indices if i < len(samples)]

@app.post("/api/motion")
def receive_motion(data: MotionData):
    now = time.time()

    if data.location_id not in store:
        store[data.location_id] = {}

    cleaned = remove_gravity(data.samples)
    resampled = resample(cleaned, data.interval_ms)

    store[data.location_id][data.device_id] = {
        "samples": resampled,
        "timestamp": now
    }

    for loc_id in list(store.keys()):
        store[loc_id] = {
            dev_id: d for dev_id, d in store[loc_id].items()
            if now - d["timestamp"] < WINDOW_SECONDS
        }

    all_series = []
    all_ids = []
    for loc_id, devices in store.items():
        for dev_id, d in devices.items():
            all_series.append(np.array(d["samples"], dtype=np.float64))
            all_ids.append((loc_id, dev_id))

    loc_indices = [i for i, (loc, _) in enumerate(all_ids) if loc == data.location_id]
    participant_count = len(loc_indices)

    if len(all_series) < 2 or participant_count < 2:
        return {
            "score": 0.0,
            "participant_count": participant_count,
            "sync_rate": 0.0
        }

    min_len = min(len(s) for s in all_series)
    all_series = [s[:min_len] for s in all_series]

    distance_matrix = dtw.distance_matrix(all_series)
    distance_matrix = np.array(distance_matrix)

    positive_distances = distance_matrix[distance_matrix > 0]
    if len(positive_distances) == 0:
        eps = 1.0
    else:
        eps = np.median(positive_distances) * 1.5

    labels = DBSCAN(
        eps=eps,
        min_samples=2,
        metric='precomputed'
    ).fit_predict(distance_matrix)

    loc_indices = [i for i, (loc, _) in enumerate(all_ids) if loc == data.location_id]
    loc_labels = [labels[i] for i in loc_indices]
    participant_count = len(loc_indices)

    non_noise = [l for l in loc_labels if l != -1]
    if len(non_noise) == 0 or participant_count == 0:
        sync_rate = 0.0
    else:
        most_common = max(set(non_noise), key=non_noise.count)
        sync_rate = non_noise.count(most_common) / participant_count

    avg_magnitude = np.mean(np.abs(resampled)) if resampled else 0.0
    score = participant_count * avg_magnitude * sync_rate

    return {
        "score": round(score, 3),
        "participant_count": participant_count,
        "sync_rate": round(sync_rate, 3)
    }
