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
        <div className="app-content">
            <div className="welcome-msg" id="archive-welcome">
                <h1>Explore predictions archive</h1>
                <div className="archive-img">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
                    </svg>
                </div>
            </div>
            <div className="archive-content-container">
                <div className="intro-msg">
                    {error ? <p>{error}</p> : <p>Click on the rows to see more details per case.</p>}
                </div>
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
            </div>
            <Modal show={showModal} onClose={handleCloseModal} prediction={selectedPrediction} />
        </div>
    );
}

export default Archive;
