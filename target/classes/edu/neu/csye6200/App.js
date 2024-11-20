// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './styles.css'; // Import shared styles

const App = () => {
    return (
        <Router>
            <div className="page-container">
                <h1 className="header">MindMate</h1>
                <h2 className="subtitle">Your Companion for Mental Wellness.</h2>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
