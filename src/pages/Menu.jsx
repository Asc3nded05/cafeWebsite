
import Navigation from '../components/Navigation';
import NavigationUse from '../components/NavigationUser';
import NavigationAdmin from '../components/NavigationAdmin';
import NavigationUser from '../components/NavigationUser';
import { useEffect, useState } from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';
import OptionMenuItem from '../components/OptionMenuItem';
import MenuItem from '../components/MenuItem';

{/* Menu Items, descriptions, and prices from http://bagelsetc.biz/Bagelsetc_menu.pdf */}


// Ordering options that need to be implemented:

// Bagel: choice of bagel type
// 1/2 Dozen Bagels: a combination of bagel choices that adds up to six bagels
// Dozen Bagels: a combination of bagel choices that adds up to twelve bagels
// Bagel with Cream Cheese: choice of bagel type, choice of cream cheese, toasted or not
// Bagel with Butter or Jelly: choice of bagel type, butter or jelly or both, toasted or not
// Bagel with Peanut Butter: choice of bagel type, toasted or not
// Egg and Cheese: choice of bagel
// Egg and Cheese with Bacon, Sausage, or Ham: choice of bagel, bacon, sausage or ham
// Egg and Cheese Wrap with Bacon, Sausage, or Ham: bacon, sausage, or ham
// Bagel Sandwiches: choice of bagel, choice of toppings from lettuce, tomato, onion, sprouts, cheese, ranch, mayo. Roasted red peppers or banana peppers $0.50 extra.
// Specialty Sandwiches: Wrap or panini
// Hot or Iced Latte: vanilla or spiced
// Hot or Iced Chai: vanilla or spiced
// Frozen Chai: vanilla or spiced
// Smoothie: Strawberry banana, mango, mint, raspberry

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

    const renderMenuItem = (item) => {
        return <MenuItem title={item.title} price={item.price} note={item.note} />;
        // if (item.options) {
        //   return <OptionMenuItem item={item} />;
        // } else {
        //   return <MenuItem title={item.title} price={item.price} note={item.note} />;
        // }
    };

    if (role == "user"){
        return (
            <>
                <NavigationUser/>
    
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
                                            {renderMenuItem(item)}
                                        </Col>
                                    ))}
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </>
        );
    } else if (role == "admin"){
        return (
            <>
                <NavigationAdmin/>
    
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
                                            {renderMenuItem(item)}
                                        </Col>
                                    ))}
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </>
        );
    } else{
        return (
            <>
                <Navigation/>
    
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
                                            {renderMenuItem(item)}
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