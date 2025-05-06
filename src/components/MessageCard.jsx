import { Card } from "react-bootstrap";

export default function MessageCard({ id, title, senderName, email, text, date }) {
    //card for a message from contacts
    return <>
        <Card>
            <Card.Body>
                {/*Adds Title and Text and date */}
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">From: {senderName}, {email}</Card.Subtitle>
                <Card.Text>{text}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
            </Card.Body>
        </Card>
    </>
}