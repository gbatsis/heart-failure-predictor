import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import './assets/css/styles.css';

ReactDOM.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>,
    document.getElementById('root')
);
