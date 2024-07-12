import React, { useEffect, useRef } from 'react';
import { transformFeatureNames, transformFeatureValues } from './utils';

const Modal = ({ show, onClose, prediction }) => {
    const overlayRef = useRef(null);

    useEffect(() => {
        if (overlayRef.current) {
            if (show) {
                overlayRef.current.classList.add('show');
            } else {
                overlayRef.current.classList.remove('show');
            }
        }
    }, [show]);

    const featureOrder = [
        'id', 'age', 'sex', 'chestPainType', 'restingBP', 'cholesterol',
        'fastingBS', 'restingECG', 'maxHR', 'exerciseAngina', 'oldpeak',
        'stSlope', 'result', 'timestamp'
    ];

    return (
        <div ref={overlayRef} className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                </button>
                <h2>Prediction Details</h2>
                {prediction && (
                    <ul>
                        {featureOrder.map((key, index) => (
                            <li key={index}>
                                <strong>{transformFeatureNames(key)}</strong>: {transformFeatureValues(key, prediction[key])}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Modal;
