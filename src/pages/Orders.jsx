import { useState, useEffect } from "react";
import NavigationAdmin from "../components/NavigationAdmin";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []); // Fetch orders on component mount

    function getOrders() {
        fetch('http://localhost:5000/api/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error retrieving orders');
                }
            })
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    function markOrderAsComplete(orderId) {
        fetch(`http://localhost:5000/api/orders/complete/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert('Order marked as completed');
                    getOrders(); // Refresh the orders list
                } else {
                    throw new Error('Error marking order as completed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    const currentOrders = orders.filter((order) => !order.completed);
    const completedOrders = orders.filter((order) => order.completed);

    return (
        <>
            <NavigationAdmin />
            <h1>Orders</h1>

            <h2>Current Orders</h2>
            <Row xs={1} md={2} className="g-4">
                {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                        <Col key={order.orderId}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Order ID: {order.orderId}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Customer: {order.customerName}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
                                    </Card.Text>
                                    <Card.Text>
                                      <strong>Pickup Date and Time:</strong> {new Date(order.pickupDateTime).toLocaleString()}
                                  </Card.Text>
                                    <Card.Text>
                                        <strong>Items:</strong>
                                    </Card.Text>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.itemName} - ${item.price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                    <Card.Text>
                                        <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                                    </Card.Text>
                                    <Button
                                        variant="success"
                                        onClick={() => markOrderAsComplete(order.orderId)}
                                    >
                                        Mark as Complete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No current orders found.</p>
                )}
            </Row>

            <h2 className="mt-5">Completed Orders</h2>
            <Row xs={1} md={2} className="g-4">
                {completedOrders.length > 0 ? (
                    completedOrders.map((order) => (
                        <Col key={order.orderId}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Order ID: {order.orderId}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Customer: {order.customerName}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Items:</strong>
                                    </Card.Text>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.itemName} - ${item.price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                    <Card.Text>
                                        <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Status:</strong> Completed
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No completed orders found.</p>
                )}
            </Row>
        </>
    );
}