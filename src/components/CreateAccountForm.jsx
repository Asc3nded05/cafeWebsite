import { useState } from 'react';

export default function CreateAccountForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function updateFirstName(newFirstName) {
        setFirstName(newFirstName);
    }

    function updateLastName(newLastName) {
        setLastName(newLastName);
    }

    function updateEmail(newEmail) {
        setEmail(newEmail);
    }

    function updatePassword(newPassword, inputElement) {
        setPassword(newPassword);
    
        // Check password strength and set custom validity
        if (newPassword.length < 6) {
            inputElement.setCustomValidity('Password is too short!');
        } else if (newPassword.length >= 24) {
            inputElement.setCustomValidity('Password is too long!');
        } else if (!/[^\w]/.test(newPassword)) { // Check for at least one non-letter character
            inputElement.setCustomValidity('Password must contain at least one non-letter character!');
        } else {
            inputElement.setCustomValidity(''); // Clear custom validity if password is valid
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (firstName === '' || lastName === '' || email === '' || password === '') {
            alert('Please fill in all fields!');
            return;
        }

        alert(`Registration successful for ${firstName} ${lastName}`);
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        required
                        onChange={(e) => updateFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        required
                        onChange={(e) => updateLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        onChange={(e) => updateEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        onChange={(e) => updatePassword(e.target.value, e.target)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    );
}