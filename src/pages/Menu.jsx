import Navigation from '../components/Navigation';
import NavigationAdmin from '../components/NavigationAdmin';
import NavigationUser from '../components/NavigationUser';
import { useEffect, useState } from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';
import MenuItemUser from '../components/MenuItemUser';
import MenuItem from "../components/MenuItem";

{/* Menu Items, descriptions, and prices from http://bagelsetc.biz/Bagelsetc_menu.pdf */ }

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Menu page loaded");

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
                console.log(data)
                setMenuItems(data); // Store the menu in state
                console.log(menuItems)
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
        if (role == "user" || role == "admin") {
            return <MenuItemUser title={item.title} price={item.price} selectBagel={item.selectBagel} selectCreamCheese={item.selectCreamCheese} selectMultipleBagels={item.selectMultipleBagels} selectSandwichToppings={item.selectSandwichToppings} selectToasted={item.selectToasted} selectDrinkFlavor={item.selectDrinkFlavor} selectSmoothieFlavor={item.selectSmoothieFlavor} selectWrapOrPanini={item.selectWrapOrPanini} />;
        }
        else {
            return <MenuItem title={item.title} price={item.price} />;
        }
    };

    if (role == "user") {
        return (
            <>
                <NavigationUser />

                <h1>Menu</h1>
                <Accordion >
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
    } else if (role == "admin") {
        return (
            <>
                <NavigationAdmin />

                <h1>Menu</h1>
                <Accordion >
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
                <Accordion >
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