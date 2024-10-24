// src/Register.js
import React from 'react';
import './styles.css'; // Import the shared CSS file

const Register = () => {
    return (
        <div className="container">
            <form className="form">
                <div className="form-group">
                    <label htmlFor="name-fn">First Name:</label>
                    <input type="text" id="name-fn" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="name-ln">Last Name:</label>
                    <input type="text" id="name-ln" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="name-ln">Email:</label>
                    <input type="email" id="email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone"/>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="sex">Sex:</label>
                    <select id="sex" required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Are you a:</label>
                    <div className="role-options">
                        <input type="radio" id="user" name="role" value="user" required/>
                        <label htmlFor="user">User</label>
                        <input type="radio" id="therapist" name="role" value="therapist"/>
                        <label htmlFor="therapist">Therapist</label>
                    </div>
                </div>
                <button type="submit" className="button">Register</button>
            </form>
        </div>
    );
};

export default Register;
