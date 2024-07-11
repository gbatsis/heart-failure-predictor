import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/Header';
import Home from './components/Home';
import Archive from './components/Archive';
import CanvasBackground from './components/Background';
import './assets/css/styles.css';

function App() {
    const location = useLocation();

    return (
        <div>
          <CanvasBackground />
          <div className="app">
            <Header />
            <div className="app-container">
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="slide" timeout={300}>
                        <Routes location={location}>
                            <Route path="/" element={<Home />} />
                            <Route path="/archive" element={<Archive />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
        </div>
    );
}

export default App;
