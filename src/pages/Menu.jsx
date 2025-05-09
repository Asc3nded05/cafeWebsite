// Importing necessary components and libraries
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
    const user = localStorage.getItem('user'); // Retrieve user data from local storage
    const role = user ? JSON.parse(user).role : null; // Gets the role from the user (user or admin)

    const [menuItems, setMenuItems] = useState([]); // State to store menu items
    const [currentOrder, setCurrentOrder] = useState([]); // State to track the current order
    const [showOffcanvas, setShowOffcanvas] = useState(false); // State to control Offcanvas visibility
    const [totalPrice, setTotalPrice] = useState(0.0); // State to store the total price of the order
    const [comment, setComment] = useState(''); // State to store user comments
    const [pickupDateTime, setPickupDateTime] = useState(''); // State for pickup date and time

    // Functions to get the minimum and maximum pickup date and time so that orders can only be placed within the next
    // two weeks between 6:00 am and 2:00 pm on Tuesday-Sunday. The shop is closed on Mondays and does not accept orders for that day. 
    function getMinPickupDateTime() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0); // 6:00 AM today
    
        // If today is Monday, set the minimum pickup date to Tuesday
        if (today.getDay() === 1) { // 1 = Monday
            today.setDate(today.getDate() + 1);
        }
    
        return now > today ? now.toISOString().slice(0, 16) : today.toISOString().slice(0, 16);
    }
    
    function getMaxPickupDateTime() {
        const now = new Date();
        const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14, 14, 0); // 2:00 PM two weeks from today
        return maxDate.toISOString().slice(0, 16);
    }

    // Function to fetch the menu from the server
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

    // If the user is not logged in, display the menu without the ability to place an order
    // If the user is logged in as a normal user, display the menu with the ability to place an order
    // If the user is logged in as an admin, display the menu with the ability to create, update, and delete menu items
    const renderMenuItem = (item, role) => {
        //converts to float and two decimal places
        const price = parseFloat(item.price);
         const priceRounded = price.toFixed(2);

        if (role === "user") {
            //Loads the Menu Item User sending the menu data
            return (
                <MenuItemUser
                    title={item.title}
                    price={priceRounded}
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
                    selectHotorIced={item.selectHotorIced}
                    addItemToOrder={addItemToOrder}
                    item={item}
                />
            );
        } else if (role === "admin") {
            return (
                //loads the Menu Item Admin  sending the menu data
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
                    selectHotorIced={item.selectHotorIced}
                    item={item}
                />
            );
        } else {
            return <MenuItem title={item.title} price={item.price} />;
        }
    };

    // Function to add an item to the current order
    function addItemToOrder(item) {
        const itemWithParsedPrice = {
            ...item,
            price: parseFloat(item.price), // Ensure the price is a number
        };
        setCurrentOrder((prevOrder) => [...prevOrder, itemWithParsedPrice]);
        alert(`Item added to order successfully!`);
    }

    // Function to remove an item from the current order by the index
    function removeItemFromOrder(index) {
        setCurrentOrder((prevOrder) => prevOrder.filter((_, i) => i !== index)); // Remove item by index
    }

    // Function to handle order submission
    async function handleSubmitOrder() {
        // Validate pickup date and time
        if (!pickupDateTime) {
            alert('Please select a valid pickup date and time.');
            return;
        }
        
        // Check if the selected date is within the valid range
        const selectedDate = new Date(pickupDateTime);
        const minDate = new Date(getMinPickupDateTime());
        const maxDate = new Date(getMaxPickupDateTime());
    
        if (selectedDate < minDate || selectedDate > maxDate) {
            alert('Pickup date and time must be within the next two weeks and between 6:00 AM and 2:00 PM.');
            return;
        }
    
        // Check if the selected day is Monday
        if (selectedDate.getDay() === 1) { // 1 = Monday
            alert('Pickup is not available on Mondays. Please select another day.');
            return;
        }
    
        // Check if the selected time is between 6:00 AM and 2:00 PM
        const selectedHours = selectedDate.getHours();
        const selectedMinutes = selectedDate.getMinutes();
        if (selectedHours < 6 || (selectedHours === 14 && selectedMinutes > 0) || selectedHours > 14) {
            alert('Pickup time must be between 6:00 AM and 2:00 PM.');
            return;
        }
        
        // Prepares the order data to be sent to the server
        const newOrder = {
            customerName: user ? JSON.parse(user).firstName + ' ' + JSON.parse(user).lastName : "Guest User",
            orderDate: new Date().toISOString(),
            pickupDateTime: pickupDateTime,
            items: currentOrder.map(item => ({ itemName: item.itemName, price: item.price, options: item.options })),
            comment: comment,
            totalAmount: ((totalPrice * 0.08) + totalPrice),
        };
        
        // Sends the order data to the server
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
                alert(`Order submitted successfully!`);
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

    // State to manage the new item creation form
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
        selectHotorIced: false
    });
    
    // Function to handle the creation of a new menu item
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
                    alert("New menu item created successfully")
                } else {
                    throw new Error('Error creating the menu item');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    // If the user is not logged in, display the menu wihtout the ability to place an order
    // If the user is logged in as a normal user, display the menu with the ability to place an order
    // If the user is logged in as an admin, display the menu with the ability to create, update, and delete menu items
    if (role === "user") {
        return (
            <>
                <div className="container mt-5">
                    <NavigationUser />

                    <h1>Menu</h1>

                    <hr></hr>
                    {/*Maps menu Items */}
                    <Accordion>
                        {menuItems.map((category, idx) => (
                            <Accordion.Item eventKey={idx.toString()} key={idx}>
                                <Accordion.Header>{category.category}</Accordion.Header>
                                <Accordion.Body>
                                    <p>{category.description}</p>
                                    <div>
                                        <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={4} className="g-4">
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
                                    {/*Maps the Current Order */}
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
                                            {/*Button to remove items */}
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
                        
                        <Offcanvas.Body>
                            <div>
                                {/*Subtotal, Tax and then total added together */}
                                <p>Subtotal: ${totalPrice.toFixed(2)}</p>
                                <p>Tax: ${(totalPrice*.08).toFixed(2)}</p>
                                <p><strong>Total: ${((totalPrice*.08) + (totalPrice)).toFixed(2)}</strong></p>
                                {/*Pickup date object */}
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
                                        Pickup is available Tuesday-Sunday between 6:00 AM and 2:00 PM within the next two weeks.
                                    </small>
                                </div>
                                {/*Comment Box */}
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
                                {/*Submit Button */}
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
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </>
        );
    } else if (role === "admin") {
        return (
            <>
                <NavigationAdmin />
                
                <div className="container mt-5">
                    <h1>Create New Menu Item</h1>

                    <hr></hr>
                    {/*Form to create new Item */}
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
                        {/*title */}
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
                        {/*Price */}
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
                        {/*Bagel Options */}
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
                        {/*Butter and Jelly Options */}
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
                            {/*Cream Cheese Options */}
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
                            {/*Drink flavor Options*/}
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
                            {/*Multiple Bagel Options */}
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
                            {/*Sandwhich Toppings Options */}
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
                            {/*Meat Options */}
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
                            {/*Smoothie Flavor Options*/}
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
                            {/*Toasted Options */}
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
                            {/*Wrap or Panini Option */}
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
                            {/*Drink Type Option */}
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="selectHotOrIced"
                                    checked={newItem.selectWrapOrPanini}
                                    onChange={(e) => setNewItem({ ...newItem, selectHotorIced: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="selectHotOrIced">Select Hot or Iced</label>
                            </div>
                        </div>
                        {/*Submit Button*/}
                        <button type="submit" className="btn btn-primary">Create Item</button>
                    </form>
                </div>
                
                <div className="container mt-5">
                    <h1>Menu</h1>

                    <hr></hr>
                    {/*Maps menu items in a Accordion*/}
                    <Accordion>
                        {menuItems.map((category, idx) => (
                            <Accordion.Item eventKey={idx.toString()} key={idx}>
                                <Accordion.Header>{category.category}</Accordion.Header>
                                <Accordion.Body>
                                    <p>{category.description}</p>
                                    <div>
                                        <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={4} className="g-4">
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
                </div>
            </>
        );
    } else {
        {/*Unlogged in Menu */}
        return (
            <>
                <div className="container mt-5">
                    <Navigation />

                    <h1>Menu</h1>

                    <hr></hr>
                    {/*Maps Menu item details */}
                    <Accordion>
                        {menuItems.map((category, idx) => (
                            <Accordion.Item eventKey={idx.toString()} key={idx}>
                                <Accordion.Header>{category.category}</Accordion.Header>
                                <Accordion.Body>
                                    <p>{category.description}</p>
                                    <div>
                                        <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={4} className="g-4">
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
                </div>
            </>
        );
    }
}