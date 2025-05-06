import { useEffect, useState } from "react";
import MessageCard from "./MessageCard";

export default function Messages() {
    const [messages, setMessages] = useState([]); // State to store messages

    //get messages from backend
    function getMessages() {
        fetch('http://localhost:5000/api/contact/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse the JSON data
                } else {
                    throw new Error('Error retrieving messages');
                }
            })
            .then((data) => {
                const reversedMessages = [...data].reverse(); // Reverse the order of the posts
                setMessages(reversedMessages); // Store the reversed posts in state
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    // Fetch messages when the component mounts
    useEffect(() => {
        getMessages();
    }, []);

    return <>
        <div className="container mt-5">
            <h1>Messages</h1>

            <hr></hr>
            
            <div className="mt-4">
                {/* dynamically displays the messages from the contact page */}
                {messages.map((message) => (
                    <MessageCard
                        key={message.id}
                        id={message.id}
                        title={message.title}
                        senderName={message.sender}
                        email={message.email}
                        text={message.message}
                        date={message.sentAt}
                    />
                ))}
            </div>
        </div>
    </>
}