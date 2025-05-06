import { Card } from 'react-bootstrap';
//excepts the title and the price of the item
export default function MenuItem({ title, price }) {
    //displays the title and price in a card
    return <>
        <Card style={{ width: '18rem', height: '14rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
            </Card.Body>
        </Card>
    </>
}