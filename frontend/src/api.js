export async function predictRisk(age) {
    const response = await fetch('http://localhost:5050/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ age })
    });
    return response.json();
}
