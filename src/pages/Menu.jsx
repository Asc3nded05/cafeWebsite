import Navigation from '../components/Navigation';
import NavigationAdmin from '../components/NavigationAdmin';
import NavigationUser from '../components/NavigationUser';
import { useEffect, useState } from 'react';
import { Accordion, Row, Col, Button, ListGroup } from 'react-bootstrap';
import MenuItemUser from '../components/MenuItemUser';
import MenuItem from '../components/MenuItem';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]); // State to track the current order
    const [showOffcanvas, setShowOffcanvas] = useState(false); // State to control Offcanvas visibility
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    const [additionalNotes, setAdditionaNotes] = useState('');

    function getMenu() {
        fetch('http://localhost:5000/api/menu', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse the JSON data
                } else {
                    throw new Error('Error retrieving menu');
                }
            })
            .then((data) => {
                setMenuItems(data); // Store the menu in state
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    // Fetch menu when the component mounts
    useEffect(() => {
        getMenu();
    }, []);

    const renderMenuItem = (item, role) => {
        if (role === "user" || role === "admin") {
            return (
                <MenuItemUser
                    title={item.title}
                    price={item.price}
                    selectBagel={item.selectBagel}
                    selectButterOrJelly={item.selectButterOrJelly}
                    selectCreamCheese={item.selectCreamCheese}
                    selectMultipleBagels={item.selectMultipleBagels}
                    selectSandwichToppings={item.selectSandwichToppings}
                    selectSausageBaconOrHam={item.selectSausageBaconOrHam}
                    selectToasted={item.selectToasted}
                    selectDrinkFlavor={item.selectDrinkFlavor}
                    selectSmoothieFlavor={item.selectSmoothieFlavor}
                    selectWrapOrPanini={item.selectWrapOrPanini}
                    addItemToOrder={addItemToOrder}
                />
            );
        } else {
            return <MenuItem title={item.title} price={item.price} />;
        }
    };

    function addItemToOrder(item) {
        setCurrentOrder((prevOrder) => [...prevOrder, item]); // Add the new item to the order
        setShowOffcanvas(true); // Open the Offcanvas when an item is added
    }

    function removeItemFromOrder(index) {
        setCurrentOrder((prevOrder) => prevOrder.filter((_, i) => i !== index)); // Remove item by index
    }

    async function handleSubmitOrder() {
        const newOrder = {
            customerName: "Guest User", // Replace with logged-in user's name if available
            orderDate: new Date().toISOString(),
            items: currentOrder,
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Order submitted successfully! Order ID: ${data.orderId}`);
                setCurrentOrder([]); // Clear the current order
                setShowOffcanvas(false); // Close the Offcanvas
            } else {
                throw new Error('Failed to submit order');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting your order. Please try again.');
        }
    }

    if (role === "user") {
        return (
            <>
                <NavigationUser />

                <h1>Menu</h1>
                <Accordion>
                    {menuItems.map((category, idx) => (
                        <Accordion.Item eventKey={idx.toString()} key={idx}>
                            <Accordion.Header>{category.category}</Accordion.Header>
                            <Accordion.Body>
                                <p>{category.description}</p>
                                <Row xs={1} md={4} className="g-4">
                                    {category.items.map((item, itemIdx) => (
                                        <Col key={itemIdx}>
                                            {renderMenuItem(item, role)}
                                        </Col>
                                    ))}
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                {/* Button to open the Offcanvas */}
                <Button
                    variant="primary"
                    className="mt-4"
                    onClick={() => setShowOffcanvas(true)}
                >
                    View Order ({currentOrder.length} items)
                </Button>

                {/* Offcanvas for Order Summary */}
                <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Your Order</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {currentOrder.length === 0 ? (
                            <p>Your order is empty.</p>
                        ) : (
                            <ListGroup>
                                {currentOrder.map((item, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>{item.itemName}</strong> - {item.price}
                                        </div>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeItemFromOrder(index)}
                                        >
                                            Remove
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}

                        <div className="mb-3">
                            <label htmlFor="textArea" className="form-label">Additional Notes</label>
                            <input
                                type="textArea"
                                className="form-control"
                                id="additionalNotes"
                                placeholder="Add any other notes for your order here"
                                value={additionalNotes}
                                onChange={(e) => setAdditionaNotes(e.target.value)}
                            />
                        </div>
                    </Offcanvas.Body>
                    <div className="mt-3 d-flex justify-content-end">
                        <Button
                            variant="success"
                            onClick={handleSubmitOrder}
                            disabled={currentOrder.length === 0}
                        >
                            Submit Order
                        </Button>
                    </div>
                </Offcanvas>
            </>
        );
    } else if (role === "admin") {
        return (
            <>
                <NavigationAdmin />

                <h1>Menu</h1>
                <Accordion>
                    {menuItems.map((category, idx) => (
                        <Accordion.Item eventKey={idx.toString()} key={idx}>
                            <Accordion.Header>{category.category}</Accordion.Header>
                            <Accordion.Body>
                                <p>{category.description}</p>
                                <Row xs={1} md={4} className="g-4">
                                    {category.items.map((item, itemIdx) => (
                                        <Col key={itemIdx}>
                                            {renderMenuItem(item, role)}
                                        </Col>
                                    ))}
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </>
        );
    } else {
        return (
            <>
                <Navigation />

                <h1>Menu</h1>
                <Accordion>
                    {menuItems.map((category, idx) => (
                        <Accordion.Item eventKey={idx.toString()} key={idx}>
                            <Accordion.Header>{category.category}</Accordion.Header>
                            <Accordion.Body>
                                <p>{category.description}</p>
                                <Row xs={1} md={4} className="g-4">
                                    {category.items.map((item, itemIdx) => (
                                        <Col key={itemIdx}>
                                            {renderMenuItem(item, role)}
                                        </Col>
                                    ))}
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </>
        );
    }
}