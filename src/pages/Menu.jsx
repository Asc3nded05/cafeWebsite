import { Accordion, Row, Col } from 'react-bootstrap';
import MenuItem from '../components/MenuItem';
import OptionMenuItem from '../components/OptionMenuItem';
import menuData from '../jsonFiles/menuData.json';
import Navigation from '../components/Navigation';
import NavigationUse from '../components/NavigationUser';
import NavigationAdmin from '../components/NavigationAdmin';


{/* When placing orders we need to include functionality to select which types of bagels the customer wants and a way to note if they want the bagel toasted or not */}
{/* Menu Items, descriptions, and prices from http://bagelsetc.biz/Bagelsetc_menu.pdf */}

export default function Menu() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Menu page loaded");

    const renderMenuItem = (item) => {
        if (item.options) {
          return <OptionMenuItem item={item} />;
        } else {
          return <MenuItem title={item.title} price={item.price} note={item.note} />;
        }
    };

    if (role == "user"){
        return (
            <>
                <NavigationUser/>
    
                <h1>Menu</h1>
                <Accordion >
                    {menuData.menuData.map((category, idx) => (
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
                    {menuData.menuData.map((category, idx) => (
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
                    {menuData.menuData.map((category, idx) => (
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