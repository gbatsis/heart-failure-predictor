import React from 'react';
import HeartFailurePredictor from './HeartFailurePredictor';

function Home() {
    return (
        <div className="app-content">
            <div class="welcome-msg">
                <h1>Welcome to the Heart Failure Predictor</h1>
            </div>
            <HeartFailurePredictor />
        </div>
    );
}

export default Home;
