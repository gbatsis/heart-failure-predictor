import React, { useState } from 'react';
import { predictRisk } from './api';

function HeartFailurePredictor() {
    const [age, setAge] = useState('');
    const [risk, setRisk] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await predictRisk(age);
        setRisk(response.risk);
    };

    return (
        <div>
            <h1>Heart Failure Risk Predictor</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="Enter age"
                />
                <button type="submit">Predict Risk</button>
            </form>
            {risk && <p>Risk: {risk}</p>}
        </div>
    );
}

export default HeartFailurePredictor;