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

export async function fetchPredictions() {
    const response = await fetch('http://localhost:5050/predictions');
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.predictions;
}

