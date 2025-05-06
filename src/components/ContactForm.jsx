import { useState } from "react";

export default function ContactForm() {
    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [email, setEmail] = useState(0);
    const [message, setMessage] = useState(0);
    const sentAt = new Date().toLocaleString() + "";

    function updateTitle(newTitle) {
        setTitle(newTitle);
    }

    function updateSender(newSender) {
        setSender(newSender);
    }

    function updateEmail(newEmail) {
        setEmail(newEmail);
    }

    function updateMessage(newMessage) {
        setMessage(newMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        //sets new message
        const newMessage = { title, sender, email, message, sentAt };
    
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
            <h1>Contact Us</h1>

            <hr></hr>
            {/* //displays contact form for guests */}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" onChange={(e) => updateTitle(e.target.value)} placeholder="Enter a title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => updateSender(e.target.value)} placeholder="Enter your name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => updateEmail(e.target.value)} placeholder="Enter your email" required />
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