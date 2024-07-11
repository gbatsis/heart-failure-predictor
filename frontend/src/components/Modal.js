import React from 'react';
import { transformFeatureNames, transformFeatureValues } from './utils';

const Modal = ({ show, onClose, prediction }) => {
    if (!show) {
        return null;
    }

    const featureOrder = [
        'id', 'age', 'sex', 'chestPainType', 'restingBP', 'cholesterol',
        'fastingBS', 'restingECG', 'maxHR', 'exerciseAngina', 'oldpeak',
        'stSlope', 'result', 'timestamp'
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
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
                <button className="modal-close" onClick={onClose}>Return</button>
            </div>
        </div>
    );
};

export default Modal;
