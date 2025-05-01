import { useState } from 'react';
import { Navigate } from 'react-router-dom';

var id = 0;

export default function CreateAccountForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedin] = useState(false);
    

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
            inputElement.setCustomValidity('Password must contain at least one non-alphanumeric character!');
        } else {
            inputElement.setCustomValidity(''); // Clear custom validity if password is valid
        }
    }

    function handleSubmit(e) {
        // Need to check to make sure email hasn't already been used

        e.preventDefault();
    
        if (firstName === '' || lastName === '' || email === '' || password === '') {
            alert('Please fill in all fields!');
            return;
        }

        const createdAt = new Date().toLocaleString() + "";
        const updatedAt = new Date().toLocaleString() + "";
        const role = "User";

        const newUser = { id, firstName, lastName, email, password, role, createdAt, updatedAt };
    

        // Send the newUser to the backend
        fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (response.ok) {
                    alert(`Registration successful for ${firstName} ${lastName}`);
                    setLoggedin(true);
                } else {
                    console.log(response); 
                    alert('Failed to register. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    }
    if (loggedIn){
        return <Navigate to="/" replace />;
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