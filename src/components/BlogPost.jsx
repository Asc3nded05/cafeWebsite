import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

export default function BlogPost({ id, title, date, text, initialLikes, initialDislikes }) {
    const [likes, setLikes] = useState(initialLikes); // State for likes
    const [dislikes, setDislikes] = useState(initialDislikes); // State for dislikes
    const [userAction, setUserAction] = useState(null); // 'liked', 'disliked', or null

    // Load user action from localStorage when the component mounts
    useEffect(() => {
        const storedAction = localStorage.getItem(`post-${id}-action`);
        if (storedAction) {
            setUserAction(storedAction);
        }
    }, [id]);

    function handleLike() {
        if (userAction === 'liked') {
            // Remove the like
            fetch(`http://localhost:5000/api/blog/unlike/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setLikes(likes - 1); // Decrement likes in the frontend
                        setUserAction(null); // Reset user action
                        localStorage.removeItem(`post-${id}-action`); // Remove from localStorage
                    } else {
                        throw new Error('Error unliking the post');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Failed to unlike the post. Please try again.');
                });
        } else {
            // Add a like
            fetch(`http://localhost:5000/api/blog/like/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setLikes(likes + 1); // Increment likes in the frontend
                        if (userAction === 'disliked') {
                            setDislikes(dislikes - 1); // Remove dislike if previously disliked
                        }
                        setUserAction('liked'); // Update user action
                        localStorage.setItem(`post-${id}-action`, 'liked'); // Save to localStorage
                    } else {
                        throw new Error('Error liking the post');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Failed to like the post. Please try again.');
                });
        }
    }

    function handleDislike() {
        if (userAction === 'disliked') {
            // Remove the dislike
            fetch(`http://localhost:5000/api/blog/undislike/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setDislikes(dislikes - 1); // Decrement dislikes in the frontend
                        setUserAction(null); // Reset user action
                        localStorage.removeItem(`post-${id}-action`); // Remove from localStorage
                    } else {
                        throw new Error('Error undisliking the post');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Failed to undislike the post. Please try again.');
                });
        } else {
            // Add a dislike
            fetch(`http://localhost:5000/api/blog/dislike/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setDislikes(dislikes + 1); // Increment dislikes in the frontend
                        if (userAction === 'liked') {
                            setLikes(likes - 1); // Remove like if previously liked
                        }
                        setUserAction('disliked'); // Update user action
                        localStorage.setItem(`post-${id}-action`, 'disliked'); // Save to localStorage
                    } else {
                        throw new Error('Error disliking the post');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Failed to dislike the post. Please try again.');
                });
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
                    <Card.Text>{text}</Card.Text>
                    <label>Likes: {likes} &nbsp;</label>
                    <label>Dislikes: {dislikes} </label>
                </Card.Body>
            </Card>
        </>
    );
}