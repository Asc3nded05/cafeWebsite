import { useState } from "react";

export default function ContactFormUser({ firstName, lastName, email }) { // Destructure props here
    const [title, setTitle] = useState('');
    const [messageContent, setMessage] = useState('');

    function updateTitle(newTitle) {
        setTitle(newTitle);
    }

    function updateMessage(newMessage) {
        setMessage(newMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        const newMessage = {
            title: title,
            sender: `${firstName} ${lastName}`, // Properly format the sender
            email: email, // Include the email
            message: messageContent,
            sentAt: new Date().toLocaleString(),
        };
    
        // Send the new post to the backend
        fetch('http://localhost:5000/api/contact/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    location.reload(); // Reload the page to see the new post
                } else if (response.status === 409) {
                    alert('Error sending message. Please try again.');
                    throw new Error('Conflict: Duplicate post');
                } else {
                    console.log(response);
                    alert('Error sending message. Please try again.');
                    throw new Error('Error creating post');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                if (error.message.includes('NetworkError')) {
                    alert('Network error. Please check your connection.');
                }
            });
    } 

    return (
        <div className="container mt-5">
            <h1 className="text-center">Contact Us</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" onChange={(e) => updateTitle(e.target.value)} placeholder="Enter a title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" onChange={(e) => updateMessage(e.target.value)} placeholder="Enter your message" required />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
    )
}