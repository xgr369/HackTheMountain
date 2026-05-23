async function testAddEvent() {
    try {
        const response = await fetch(
            "http://172.22.96.1:999/server/addevent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( {
					"artistName": "Bob",
					"genre": "Reggae",
					"locationName": "Old Port",
					"lat": -127,
					"lng": 128,
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
