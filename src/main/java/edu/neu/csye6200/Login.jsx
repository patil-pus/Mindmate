// src/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the shared CSS file

const Login = () => {
    return (
        <div className="container">
            <form className="form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit" className="button">Login</button>
            </form>
            <p className="register-prompt">
                First time user? <Link to="/register" className="register-link">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
