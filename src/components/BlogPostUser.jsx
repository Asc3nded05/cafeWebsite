import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

export default function BlogPost({ id, title, date, text, initialLikes, initialDislikes, likedBy, dislikedBy }) {
    const [likes, setLikes] = useState(initialLikes); // State for likes
    const [dislikes, setDislikes] = useState(initialDislikes); // State for dislikes
    const [userAction, setUserAction] = useState(null); // 'liked', 'disliked', or null

    // Load user action when the component mounts
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in user
        const userId = user?.id;

        if (likedBy.includes(userId)) {
            setUserAction('liked');
        } else if (dislikedBy.includes(userId)) {
            setUserAction('disliked');
        }
    }, [likedBy, dislikedBy]);

    function handleLike() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (userAction === 'liked') {
            // Remove the like
            fetch(`http://localhost:5000/api/blog/unlike/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            })
                .then((response) => {
                    if (response.ok) {
                        setLikes(likes - 1);
                        setUserAction(null);
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
                body: JSON.stringify({ userId }),
            })
                .then((response) => {
                    if (response.ok) {
                        setLikes(likes + 1);
                        if (userAction === 'disliked') {
                            setDislikes(dislikes - 1); // Remove dislike if previously disliked
                        }
                        setUserAction('liked');
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
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (userAction === 'disliked') {
            // Remove the dislike
            fetch(`http://localhost:5000/api/blog/undislike/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            })
                .then((response) => {
                    if (response.ok) {
                        setDislikes(dislikes - 1);
                        setUserAction(null);
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
                body: JSON.stringify({ userId }),
            })
                .then((response) => {
                    if (response.ok) {
                        setDislikes(dislikes + 1);
                        if (userAction === 'liked') {
                            setLikes(likes - 1); // Remove like if previously liked
                        }
                        setUserAction('disliked');
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
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
                <Card.Text>{text}</Card.Text>
                <Button
                    variant={userAction === 'liked' ? 'success' : 'primary'}
                    onClick={handleLike}
                >
                    {userAction === 'liked' ? 'Liked' : 'Like'}
                </Button>{' '}
                <label>{likes}</label>
                <Button
                    variant={userAction === 'disliked' ? 'danger' : 'primary'}
                    className="ms-2"
                    onClick={handleDislike}
                >
                    {userAction === 'disliked' ? 'Disliked' : 'Dislike'}
                </Button>{' '}
                <label>{dislikes}</label>
            </Card.Body>
        </Card>
    );
}