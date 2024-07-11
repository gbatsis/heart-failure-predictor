import React from 'react';
import HeartFailurePredictor from './HeartFailurePredictor';

function Home() {
    return (
        <div className="wrapper">
            <div className="main-container">
                <div className="content-wrapper">
                    <div class="welcome-msg">
                        <h1>Welcome to Heart Failure Predictor</h1>
                        <p>Your trusted tool for predicting heart failure risk.</p>
                    </div>
                    <HeartFailurePredictor />
                </div>
            </div>
        </div>
    );
}

export default Home;
