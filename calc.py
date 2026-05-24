import sys
import json
import math
import traceback
import numpy as np
from dtaidistance import dtw
from sklearn.cluster import DBSCAN


def error_response(message, details=None):
    response = {
        "ok": False,
        "error": message,
        "score": 0.0,
        "participant_count": 0,
        "sync_rate": 0.0
    }

    if details:
        response["details"] = details

    return response


def success_response(score, participant_count, sync_rate):
    return {
        "ok": True,
        "score": round(float(score), 3),
        "participant_count": int(participant_count),
        "sync_rate": round(float(sync_rate), 3)
    }


def is_valid_number(value):
    return isinstance(value, (int, float)) and math.isfinite(value)


def clean_samples(samples):
    if not isinstance(samples, list):
        return []

    cleaned = []

    for value in samples:
        if is_valid_number(value):
            cleaned.append(float(value))

    return cleaned


def remove_gravity(samples):
    if len(samples) == 0:
        return []

    mean = float(np.mean(samples))

    return [s - mean for s in samples]


def calculate_score(data):
    if not isinstance(data, dict):
        return error_response("Input JSON must be an object")

    devices = data.get("devices")

    if not isinstance(devices, list):
        return error_response("Missing or invalid 'devices' array")

    participant_count = len(devices)

    if participant_count < 2:
        return success_response(
            score=0.0,
            participant_count=participant_count,
            sync_rate=0.0
        )

    all_series = []

    for device in devices:
        if not isinstance(device, dict):
            continue

        samples = device.get("motion")
        samples = clean_samples(samples)

        if len(samples) < 2:
            continue

        cleaned = remove_gravity(samples)

        if len(cleaned) < 2:
            continue

        series = np.array(cleaned, dtype=np.float64)

        if np.any(~np.isfinite(series)):
            continue

        all_series.append(series)

    valid_participant_count = len(all_series)

    if valid_participant_count < 2:
        return success_response(
            score=0.0,
            participant_count=participant_count,
            sync_rate=0.0
        )

    min_len = min(len(series) for series in all_series)

    if min_len < 2:
        return success_response(
            score=0.0,
            participant_count=participant_count,
            sync_rate=0.0
        )

    all_series = [series[:min_len] for series in all_series]

    try:
        distance_matrix = dtw.distance_matrix(all_series)
        distance_matrix = np.array(distance_matrix, dtype=np.float64)
    except Exception as err:
        return error_response(
            "DTW distance calculation failed",
            details=str(err)
        )

    if distance_matrix.shape[0] < 2:
        return success_response(
            score=0.0,
            participant_count=participant_count,
            sync_rate=0.0
        )

    if np.any(~np.isfinite(distance_matrix)):
        return error_response("Distance matrix contains invalid values")

    positive_distances = distance_matrix[distance_matrix > 0]

    if len(positive_distances) == 0:
        eps = 1.0
    else:
        eps = float(np.median(positive_distances) * 1.5)

    if not math.isfinite(eps) or eps <= 0:
        eps = 1.0

    try:
        labels = DBSCAN(
            eps=eps,
            min_samples=2,
            metric="precomputed"
        ).fit_predict(distance_matrix)
    except Exception as err:
        return error_response(
            "DBSCAN clustering failed",
            details=str(err)
        )

    non_noise = [label for label in labels if label != -1]

    if len(non_noise) == 0:
        sync_rate = 0.0
    else:
        most_common = max(set(non_noise), key=non_noise.count)

        sync_rate = non_noise.count(most_common) / participant_count

    magnitudes = []

    for series in all_series:
        value = float(np.mean(np.abs(series)))

        if math.isfinite(value):
            magnitudes.append(value)

    if len(magnitudes) == 0:
        avg_magnitude = 0.0
    else:
        avg_magnitude = float(np.mean(magnitudes))

    score = participant_count * avg_magnitude * sync_rate

    if not math.isfinite(score):
        score = 0.0

    return success_response(
        score=score,
        participant_count=participant_count,
        sync_rate=sync_rate
    )


def main():
    try:
        raw_input = sys.stdin.read()

        if not raw_input.strip():
            result = error_response("No input received")
            print(json.dumps(result))
            sys.exit(1)

        try:
            data = json.loads(raw_input)
        except json.JSONDecodeError as err:
            result = error_response(
                "Invalid JSON input",
                details=str(err)
            )
            print(json.dumps(result))
            sys.exit(1)

        result = calculate_score(data)

        print(json.dumps(result))

        if result.get("ok") is False:
            sys.exit(1)

        sys.exit(0)

    except Exception as err:
        result = error_response(
            "Unexpected Python error",
            details=str(err)
        )

        print(json.dumps(result))

        print(traceback.format_exc(), file=sys.stderr)

        sys.exit(1)


if __name__ == "__main__":
    main()