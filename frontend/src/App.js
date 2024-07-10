import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeartFailurePredictor from './HeartFailurePredictor';
import Archive from './Archive';
import './assets/css/styles.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/archive" element={<Archive />} />
          <Route path="/" element={<HeartFailurePredictor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
