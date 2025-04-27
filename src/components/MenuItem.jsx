import { Card, Button } from 'react-bootstrap';

export default function MenuItem({ title, price }) {
    return (
        <Card style={{ width: '18rem', height: '14rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                <Button variant="primary">Add to Order</Button>
            </Card.Body>
        </Card>
    );
}