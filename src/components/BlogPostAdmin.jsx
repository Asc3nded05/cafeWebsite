import { Card, Button } from 'react-bootstrap';

export default function BlogPostAdmin({ id, title, date, text }) {
    function deletePost() {
        fetch(`http://localhost:5000/api/blog/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    
                } else {
                    throw new Error('Error deleting the blog post');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });

        location.reload();
    }

    return (
        <>
            <Card style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
                    <Card.Text>{text}</Card.Text>
                    <Button variant="primary">Update</Button>
                    <Button variant="primary" className="ms-2" onClick={deletePost}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}