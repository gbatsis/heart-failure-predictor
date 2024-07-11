import React, { useEffect, useState } from 'react';
import { fetchPredictions } from './api';
import Modal from './Modal';

function Archive() {
    const [predictions, setPredictions] = useState([]);
    const [selectedPrediction, setSelectedPrediction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const predictions = await fetchPredictions();
                setPredictions(predictions);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = (prediction) => {
        setSelectedPrediction(prediction);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPrediction(null);
    };

    return (
        <div className="archive-container">
            <div className="archive-header">
                <h1>Archive</h1>
            </div>
            {error && <p>{error}</p>}
            <table className="archive-table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions.map((prediction, index) => (
                        <tr key={index} onClick={() => handleRowClick(prediction)}>
                            <td data-label="Time">{prediction.timestamp}</td>
                            <td data-label="Probability">{(prediction.result * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onClose={handleCloseModal} prediction={selectedPrediction} />
        </div>
    );
}

export default Archive;
