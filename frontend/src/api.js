export async function predictRisk(data) {
    const response = await fetch('http://localhost:5050/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
