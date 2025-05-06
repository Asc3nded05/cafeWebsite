import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function BlogPostAdmin({ id, title, date, text, likes, dislikes }) {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [editedTitle, setEditedTitle] = useState(title); // State for the edited title
    const [editedContent, setEditedContent] = useState(text); // State for the edited content

    function handleShowModal() {
        setShowModal(true); // Show the modal
    }

    function handleCloseModal() {
        setShowModal(false); // Hide the modal
    }


    //updates post
    function handleUpdatePost() {
        const updatedPost = {
            id: id,
            title: editedTitle,
            content: editedContent,
            updatedAt: new Date().toLocaleString() + "",
        };


        //updates blog post
        fetch(`http://localhost:5000/api/blog/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        })
            .then((response) => {
                if (response.ok) {
                    setShowModal(false); // Close the modal after a successful update
                    location.reload(); // Reload the page to see the updated post
                } else {
                    throw new Error('Error updating the blog post');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    //deletes the post
    function deletePost() {
        fetch(`http://localhost:5000/api/blog/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    location.reload(); // Reload the page after deletion
                } else {
                    throw new Error('Error deleting the blog post');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    return (
        <>
        {/* card for a blog post */}
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
                    <Card.Text>{text}</Card.Text>
                    <p>Likes: {likes}</p>
                    <p>Dislikes: {dislikes}</p>
                    <Button variant="primary" className="ms-2" onClick={handleShowModal}>
                        Update
                    </Button>
                    <Button variant="primary" className="ms-2" onClick={deletePost}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>

            {/* Modal for editing the blog post */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Blog Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdatePost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}