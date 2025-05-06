import { Card } from 'react-bootstrap';

// Accepts the title and the price of the item
export default function MenuItem({ title, price }) {
    // Format the price to two decimal places with a dollar sign
    const formattedPrice = `$${parseFloat(price).toFixed(2)}`;

    // Displays the title and price in a card
    return (
        <>
            <Card style={{ width: '18rem', height: '14rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{formattedPrice}</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    );
}