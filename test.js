async function testAddEvent() {
    try {
        const response = await fetch(
            "http://localhost:3000/server/addevent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    artist: "The Weeknd",
                    date: "2026-06-01T20:00:00",
                    location: "Montreal",
                    tags: ["pop", "concert"],
                    media: "weeknd.jpg"
                })
            }
        );

        const data = await response.json();

        console.log("Status:", response.status);
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

testAddEvent();