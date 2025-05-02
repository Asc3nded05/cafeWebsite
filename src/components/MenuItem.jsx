import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import SelectCreamCheese from './selectCreamCheese';

export default function MenuItem({ title, price }) {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    function handleShowModal() {
        setShowModal(true); // Show the modal
    }

    function handleCloseModal() {
        setShowModal(false); // Hide the modal
    }

    return <>
        <Card style={{ width: '18rem', height: '14rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                <Button variant="primary" onClick={handleShowModal}>Add to Order</Button>
            </Card.Body>
        </Card>

        {/* Modal for editing the blog post */}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Select Order Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Have this section dynamically change based on options set in the json for the menu item. Ex if "selectToasted" is
                    set to True in the json for this menu item, then display the selectToasted.jsx component */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button variant="primary">
                    Add to Order
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}