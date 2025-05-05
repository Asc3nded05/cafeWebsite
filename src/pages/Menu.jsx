import Navigation from '../components/Navigation';
import NavigationAdmin from '../components/NavigationAdmin';
import NavigationUser from '../components/NavigationUser';
import { useEffect, useState } from 'react';
import { Accordion, Row, Col, Button, ListGroup } from 'react-bootstrap';
import MenuItemUser from '../components/MenuItemUser';
import MenuItemAdmin from '../components/MenuItemAdmin';
import MenuItem from '../components/MenuItem';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]); // State to track the current order
    const [showOffcanvas, setShowOffcanvas] = useState(false); // State to control Offcanvas visibility
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [comment, setComment] = useState(''); // Add state for comment
    const [pickupDateTime, setPickupDateTime] = useState(''); // State for pickup date and time

    function getMinPickupDateTime() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0); // 6:00 AM today
        return now > today ? now.toISOString().slice(0, 16) : today.toISOString().slice(0, 16);
    }
    
    function getMaxPickupDateTime() {
        const now = new Date();
        const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14, 14, 0); // 2:00 PM two weeks from today
        return maxDate.toISOString().slice(0, 16);
    }

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

    // Recalculate total price whenever the currentOrder changes
    useEffect(() => {
        const newTotal = currentOrder.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotalPrice(newTotal);
    }, [currentOrder]);

    const renderMenuItem = (item, role) => {
        if (role === "user") {
            return (
                <MenuItemUser
                    title={item.title}
                    price={item.price}
                    selectBagel={item.selectBagel}
                    selectButterOrJelly={item.selectButterOrJelly}
                    selectCreamCheese={item.selectCreamCheese}
                    selectMultipleBagels={item.selectMultipleBagels}
                    selectSausageBaconOrHam={item.selectSausageBaconOrHam}
                    selectSandwichToppings={item.selectSandwichToppings}
                    selectToasted={item.selectToasted}
                    selectDrinkFlavor={item.selectDrinkFlavor}
                    selectSmoothieFlavor={item.selectSmoothieFlavor}
                    selectWrapOrPanini={item.selectWrapOrPanini}
                    addItemToOrder={addItemToOrder}
                    item={item}
                />
            );
        } else if (role === "admin") {
            return (
                <MenuItemAdmin
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    selectBagel={item.selectBagel}
                    selectButterOrJelly={item.selectButterOrJelly}
                    selectCreamCheese={item.selectCreamCheese}
                    selectMultipleBagels={item.selectMultipleBagels}
                    selectSausageBaconOrHam={item.selectSausageBaconOrHam}
                    selectSandwichToppings={item.selectSandwichToppings}
                    selectToasted={item.selectToasted}
                    selectDrinkFlavor={item.selectDrinkFlavor}
                    selectSmoothieFlavor={item.selectSmoothieFlavor}
                    selectWrapOrPanini={item.selectWrapOrPanini}
                    item={item}
                />
            );
        } else {
            return <MenuItem title={item.title} price={item.price} />;
        }
    };

    function addItemToOrder(item) {
        setCurrentOrder((prevOrder) => [...prevOrder, item]);
    }

    function removeItemFromOrder(index) {
        setCurrentOrder((prevOrder) => prevOrder.filter((_, i) => i !== index)); // Remove item by index
    }

    async function handleSubmitOrder() {
        if (!pickupDateTime) {
            alert('Please select a valid pickup date and time.');
            return;
        }
    
        const selectedDate = new Date(pickupDateTime);
        const minDate = new Date(getMinPickupDateTime());
        const maxDate = new Date(getMaxPickupDateTime());
    
        // Check if the selected date is within the valid range
        if (selectedDate < minDate || selectedDate > maxDate) {
            alert('Pickup date and time must be within the next two weeks and between 6:00 AM and 2:00 PM.');
            return;
        }
    
        // Check if the selected time is between 6:00 AM and 2:00 PM
        const selectedHours = selectedDate.getHours();
        const selectedMinutes = selectedDate.getMinutes();
        if (selectedHours < 6 || (selectedHours === 14 && selectedMinutes > 0) || selectedHours > 14) {
            alert('Pickup time must be between 6:00 AM and 2:00 PM.');
            return;
        }
    
        const newOrder = {
            customerName: user ? JSON.parse(user).firstName + ' ' + JSON.parse(user).lastName : "Guest User",
            orderDate: new Date().toISOString(),
            pickupDateTime: pickupDateTime,
            items: currentOrder.map(item => ({ itemName: item.itemName, price: item.price, options: item.options })),
            comment: comment,
            totalAmount: ((totalPrice * 0.08) + totalPrice),
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
                setTotalPrice(0.0); // Reset the total price
                setPickupDateTime(''); // Reset the pickup date and time
                setShowOffcanvas(false); // Close the Offcanvas
                setComment(''); // Clear the comment
            } else {
                throw new Error('Failed to submit order');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting your order. Please try again.');
        }
    }

    const [newItem, setNewItem] = useState({
        category: '',
        title: '',
        price: '',
        selectBagel: false,
        selectButterOrJelly: false,
        selectToasted: false,
        selectCreamCheese: false,
        selectMultipleBagels: false,
        selectSandwichToppings: false,
        selectSausageBaconOrHam: false,
        selectWrapOrPanini: false,
        selectDrinkFlavor: false,
        selectSmoothieFlavor: false,
    });
        
    function handleCreateItem() {
        fetch('http://localhost:5000/api/menu/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then((response) => {
                if (response.ok) {
                    location.reload(); // Reload the page after creating
                } else {
                    throw new Error('Error creating the menu item');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
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
                                <div className="d-flex justify-content-center">
                                    <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
                                        {category.items.map((item, itemIdx) => (
                                            <Col key={itemIdx}>
                                                {renderMenuItem(item, role)}
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
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
                    View Order ({currentOrder.length} items) - Total: ${((totalPrice *.08) + totalPrice).toFixed(2)}
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
                                            <strong>{item.itemName}</strong> - ${parseFloat(item.price).toFixed(2)}
                                            {item.options && Object.keys(item.options).length > 0 && (
                                                <div>
                                                    Options:
                                                    {Object.entries(item.options).map(([optionName, optionValue]) => (
                                                        <div key={optionName}>
                                                            {typeof optionValue === 'boolean' ? (optionValue ? 'Toasted' : 'Untoasted') : optionValue.toString()}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                           
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
                    </Offcanvas.Body>

                    <div>
                        <p>Subtotal: ${totalPrice.toFixed(2)}</p>
                        <p>Tax: ${(totalPrice*.08).toFixed(2)}</p>
                        <p><strong>Total: ${((totalPrice*.08) + (totalPrice)).toFixed(2)}</strong></p>
                        <div>
                            <label htmlFor="pickupDateTime" className="form-label">Pickup Date and Time:</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="pickupDateTime"
                                value={pickupDateTime}
                                onChange={(e) => setPickupDateTime(e.target.value)}
                                min={getMinPickupDateTime()} // Set the minimum valid date and time
                                max={getMaxPickupDateTime()} // Set the maximum valid date and time
                            />
                            <small className="text-muted">
                                Pickup is available Monday-Friday between 6:00 AM and 2:00 PM within the next two weeks.
                            </small>
                        </div>
                        <div>
                            <label htmlFor="comment" className="form-label">Add a comment:</label>
                            <textarea
                                className="form-control"
                                id="comment"
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="success"
                                onClick={handleSubmitOrder}
                                disabled={currentOrder.length === 0}
                            >
                                Submit Order
                            </Button>
                        </div>
                    </div>
                </Offcanvas>
            </>
        );
    } else if (role === "admin") {
        return (
            <>
                <NavigationAdmin />
                
                <div className="container mt-5">
                    <h1 className="text-center">Create New Menu Item</h1>
                    <form onSubmit={(e) => { e.preventDefault(); handleCreateItem(); }} className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                className="form-select"
                                id="category"
                                value={newItem.category}
                                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {menuItems.map((category, idx) => (
                                    <option key={idx} value={category.category}>{category.category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={newItem.title}
                                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                placeholder="Enter the item title"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                placeholder="Enter the item price"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Options</label>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectBagel"
                                    checked={newItem.selectBagel}
                                    onChange={(e) => setNewItem({ ...newItem, selectBagel: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectBagel">Select Bagel</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectButterOrJelly"
                                    checked={newItem.selectButterOrJelly}
                                    onChange={(e) => setNewItem({ ...newItem, selectButterOrJelly: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectButterOrJelly">Select Butter Or Jelly</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectCreamCheese"
                                    checked={newItem.selectCreamCheese}
                                    onChange={(e) => setNewItem({ ...newItem, selectCreamCheese: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectCreamCheese">Select Cream Cheese</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectDrinkFlavor"
                                    checked={newItem.selectDrinkFlavor}
                                    onChange={(e) => setNewItem({ ...newItem, selectDrinkFlavor: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectDrinkFlavor">Select Drink Flavor</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectMultipleBagels"
                                    checked={newItem.selectMultipleBagels}
                                    onChange={(e) => setNewItem({ ...newItem, selectMultipleBagels: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectMultipleBagels">Select Multiple Bagels</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectSandwichToppings"
                                    checked={newItem.selectSandwichToppings}
                                    onChange={(e) => setNewItem({ ...newItem, selectSandwichToppings: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectSandwichToppings">Select Sandwich Toppings</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectSausageBaconOrHam"
                                    checked={newItem.selectSausageBaconOrHam}
                                    onChange={(e) => setNewItem({ ...newItem, selectSausageBaconOrHam: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectSausageBaconOrHam">Select Sausage, Bacon, or Ham</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectSmoothieFlavor"
                                    checked={newItem.selectSmoothieFlavor}
                                    onChange={(e) => setNewItem({ ...newItem, selectSmoothieFlavor: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectSmoothieFlavor">Select Smoothie Flavor</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectToasted"
                                    checked={newItem.selectToasted}
                                    onChange={(e) => setNewItem({ ...newItem, selectToasted: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectToasted">Select Toasted</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectWrapOrPanini"
                                    checked={newItem.selectWrapOrPanini}
                                    onChange={(e) => setNewItem({ ...newItem, selectWrapOrPanini: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectWrapOrPanini">Select Wrap or Panini</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Item</button>
                    </form>
                </div>

                <h1 className="text-center">Menu</h1>

                <Accordion>
                    {menuItems.map((category, idx) => (
                        <Accordion.Item eventKey={idx.toString()} key={idx}>
                            <Accordion.Header>{category.category}</Accordion.Header>
                            <Accordion.Body>
                                <p>{category.description}</p>
                                <div className="d-flex justify-content-center">
                                    <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
                                        {category.items.map((item, itemIdx) => (
                                            <Col key={itemIdx}>
                                                {renderMenuItem(item, role)}
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
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
                                <div className="d-flex justify-content-center">
                                    <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
                                        {category.items.map((item, itemIdx) => (
                                            <Col key={itemIdx}>
                                                {renderMenuItem(item, role)}
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </>
        );
    }
}