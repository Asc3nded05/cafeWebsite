import { Card, Button } from 'react-bootstrap';

export default function BlogPost({ title, date, text }) {
    return (
        <>
            <Card style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
                    <Card.Text>{text}</Card.Text>
                    <Button variant="primary">Like</Button>
                    <Button variant="primary" className="ms-2">Dislike</Button>
                </Card.Body>
            </Card>
        </>
    );
}