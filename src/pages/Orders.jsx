// Importing necessary components and libraries
import { useState, useEffect } from "react";
import NavigationAdmin from "../components/NavigationAdmin";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function Orders() {
    const [orders, setOrders] = useState([]); // State to hold orders

    // Fetch orders on component mount
    useEffect(() => {
        getOrders();
    }, []); 

    // Function to fetch orders from the API
    function getOrders() {
        fetch('http://localhost:5000/api/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); //return json reponse
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

    // Function to mark an order as completed
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

    // Filters the orders into one that have been complete and ones that still need to be fulfilled
    const currentOrders = orders.filter((order) => !order.completed);
    const completedOrders = orders.filter((order) => order.completed);
    
    return (
        <>
            <NavigationAdmin />
            <div className="container mt-5">
                <h1 >Orders</h1>

                <hr></hr>

                <div className="container mt-5">
                    <h2>Current Orders</h2>

                    <hr></hr>
                    {/*Maps current Orders */}
                    <Row xs={1} md={2} className="g-4">
                        {currentOrders.length > 0 ? (
                            currentOrders.map((order) => (
                                <Col key={order.orderId}>
                                    <Card>
                                        {/*Order Details */}
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
                                                    {/*Maps items in the order*/}
                                                    {order.items.map((item, index) => (
                                                        <li key={index}>
                                                            <strong>{item.itemName}</strong> - ${item.price.toFixed(2)}
                                                            {item.options && Object.keys(item.options).length > 0 && (
                                                                <ul>   
                                                                    {/*Simplifes reading of order items */}
                                                                    {Object.entries(item.options).map(([optionName, optionValue]) => (
                                                                        <li key={optionName}>
                                                                            {optionName.replace(/([A-Z])/g, ' $1')}:{" "}
                                                                            {typeof optionValue === "boolean"
                                                                                ? optionValue
                                                                                    ? "Yes"
                                                                                    : "No"
                                                                                : Array.isArray(optionValue)
                                                                                ? optionValue.join(", ")
                                                                                : typeof optionValue === "object"
                                                                                ? Object.entries(optionValue)
                                                                                    .map(([key, value]) => `${key} (${value})`)
                                                                                    .join(", ")
                                                                                : optionValue.toString()}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            <Card.Text>
                                                {/*total amount */}
                                                <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                                            </Card.Text>
                                            {/*mark complete button */}
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

                </div>

                <div className="container mt-5">
                    <h2 className="mt-5">Completed Orders</h2>
                    {/**Map Completed Orders */}
                    <hr></hr>
                    <Row xs={1} md={2} className="g-4">
                        {completedOrders.length > 0 ? (
                            completedOrders.map((order) => (
                                <Col key={order.orderId}>
                                    <Card>
                                        {/*Completed order details and made more readable*/}
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
                                                            <strong>{item.itemName}</strong> - ${item.price.toFixed(2)}
                                                            {item.options && Object.keys(item.options).length > 0 && (
                                                                <ul>
                                                                    {Object.entries(item.options).map(([optionName, optionValue]) => (
                                                                        <li key={optionName}>
                                                                            {optionName.replace(/([A-Z])/g, ' $1')}:{" "}
                                                                            {typeof optionValue === "boolean"
                                                                                ? optionValue
                                                                                    ? "Yes"
                                                                                    : "No"
                                                                                : Array.isArray(optionValue)
                                                                                ? optionValue.join(", ")
                                                                                : typeof optionValue === "object"
                                                                                ? Object.entries(optionValue)
                                                                                    .map(([key, value]) => `${key} (${value})`)
                                                                                    .join(", ")
                                                                                : optionValue.toString()}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            <Card.Text>
                                                <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                                            </Card.Text>
                                            {/*Sets status to complete */}
                                            <Card.Text>
                                                <strong>Status:</strong> Completed
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            //if no orders
                            <p>No completed orders found.</p>
                        )}
                    </Row>
                </div>
            </div>
        </>
    );
}