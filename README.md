# LiveNear App

A platform that visualizes real-time audience engagement in small live street performances, such as musicians performing in Montreal metro stations, through smartphone motion.
Audience members lightly move or shake their phones along with the music, and the collective energy is reflected on a live city map to show where performances are currently resonating with people.
Instead of relying on written reviews or explicit feedback, the platform captures more natural, spontaneous, and immediate audience reactions through collective physical movement.
Over time, the accumulated interaction data can also help artists understand which locations, times, and types of performances connect most strongly with audiences.

## Technical Challenge

The main technical challenge is estimating real-time audience engagement from noisy smartphone motion data.
The project needs to distinguish natural audience movement from unrelated motion, while aggregating synchronized movement from many devices in real time. This requires processing accelerometer data, detecting collective rhythmic patterns, and visualizing crowd energy dynamically on a live city map.
To analyze collective rhythmic behavior, the project used Dynamic Time Warping (DTW) to compare motion patterns between audience members, even when their movements were slightly out of sync. DBSCAN was then applied to the DTW distance matrix to group devices with similar motion patterns.
The processed data was visualized dynamically on a live city map, allowing areas with strong synchronized audience reactions to appear more prominently in real time. Over time, accumulated interaction data also provided artists with insights into which locations, times, and performance styles generated the strongest audience engagement.

## Mobile-specific Features

### Accelerometer

The system uses smartphone accelerometers to capture motion data from audience members during live performances. By measuring changes in acceleration over time, the platform detects rhythmic movement patterns such as people nodding, shaking their phones, or moving along with the music.
These motion sequences are analyzed in real time to estimate how synchronized the audience is at a specific location. Similar movement patterns between devices are grouped together using time-series similarity analysis and clustering techniques.
The platform then calculates a popularity score based on three factors: the audience size, the intensity of movement, and the degree of synchronization between audience members. (Though there needs to be >2 people.) Locations where many people move together in rhythm have a higher score, and this reflects the popularity of the nearest event.

### GPS

The platform uses smartphone GPS data to automatically determine where audience activity is happening, with each motion sequence being associated to an event (within 200 meters, calculated by latitude and longitude). This allows audience engagement to be measured in real time without explicit indication from users (so nothing like upvotes).

## Tech Stack

### Frontend

- HTML / CSS / JavaScript

### Backend

- Express.js

- Python (for motion analysis)
- NumPy
- dtaidistance (DTW)
- scikit-learn (DBSCAN)

