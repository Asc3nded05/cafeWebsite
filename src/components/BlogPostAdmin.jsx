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


    //Function to update a post
    function handleUpdatePost() {
        // Prepares the data for the updated post
        const updatedPost = {
            id: id,
            title: editedTitle,
            content: editedContent,
            updatedAt: new Date().toLocaleString() + "",
        };


        // Updates the blog post by sending the new data to the backend
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

    // Function to delete a blog post
    function deletePost() {
        // Deletes the blog post from the backend based on its id
        fetch(`http://localhost:5000/api/blog/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert("Post succesfully deleted")
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
        {/* Card for a blog post */}
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
                    <Button variant="danger" className="ms-2" onClick={deletePost}>
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
                    {/**Cancel Button */}
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    {/**Save Button */}
                    <Button variant="primary" onClick={handleUpdatePost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}