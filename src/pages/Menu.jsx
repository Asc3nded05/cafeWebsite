import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';


export default function Menu() {
    return <>
        <h1>Menu</h1>

        {/* When placing orders we need to include functionality to select which types of bagels the customer wants and a way to note if they want the bagel toasted or not */}
        {/* Menu Items, descriptions, and prices from http://bagelsetc.biz/Bagelsetc_menu.pdf */}

        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Fresh Baked Bagels</Accordion.Header>
                <Accordion.Body>
                    NY Style Bagels Made Fresh Daily.

                    <br />

                    <Row xs={1} md={4} className="g-4">
                        {[
                            { title: 'Bagel', price: '$1.25' },
                            { title: '1/2 Dozen Bagels', price: '$7.25' },
                            { title: 'Dozen Bagels', price: '$17.99' },
                            { title: 'Bagel with Cream Cheese', price: '$2.95' },
                            { title: 'Bagel with Butter or Jelly', price: '$2.00' },
                            { title: 'Bagel with Peanut Butter', price: '$2.85' },
                        ].map((item, idx) => (
                            <Col key={idx}>
                                <Card style={{ width: '18rem', height: '14rem'}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                        <Button variant="primary">Add to Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Home Made Cream Cheese</Accordion.Header>
                <Accordion.Body>
                    8oz fresh made Cream Cheese tubs.

                    <br />

                    <Row xs={1} md={4} className="g-4">
                        {[
                            { title: 'Plain', price: '$3.75' },
                            { title: 'Light', price: '$3.75' },
                            { title: 'Strawberry', price: '$3.75' },
                            { title: 'Maple and Honey Walnut', price: '$3.75' },
                            { title: 'Olive and Pimiento', price: '$3.75' },
                            { title: 'Bacon and Scallion', price: '$3.75' },
                            { title: 'Onion and Chive', price: '$3.75' },
                            { title: 'Jalapeno', price: '$3.75' },
                            { title: 'Vegetable', price: '$3.75' },
                        ].map((item, idx) => (
                            <Col key={idx}>
                                <Card style={{ width: '18rem', height: '14rem'}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                        <Button variant="primary">Add to Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Breakfast Sandwiches</Accordion.Header>
                <Accordion.Body>
                    Served all day on your choice of bagel or wrap.

                    <br />

                    <Row xs={1} md={4} className="g-4">
                        {[
                            { title: 'Egg and Cheese', price: '$3.25' },
                            { title: 'Egg and Cheese with Bacon, Sausage, or Ham', price: '$4.25' },
                            { title: 'Egg and Cheese Wrap', price: '$6.29' },
                            { title: 'Egg and Cheese Wrap with Bacon, Sausage, or Ham', price: '$7.29' },
                        ].map((item, idx) => (
                            <Col key={idx}>
                                <Card style={{ width: '18rem', height: '14rem'}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                        <Button variant="primary">Add to Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Bagel Sandwiches</Accordion.Header>
                <Accordion.Body>
                    Served on your choice of bagel with any of the
                    following: Lettuce, tomato, onion, sprouts, cheese and
                    choice of dressing. Roasted Red peppers & banana
                    peppers .50 extra.

                    <br />

                    <Row xs={1} md={4} className="g-4">
                        {[
                            { title: 'Ham', price: '$5.95' },
                            { title: 'Turkey', price: '$5.95' },
                            { title: 'Chicken Salad', price: '$5.95' },
                            { title: 'Tuna Salad', price: '$5.95' },
                            { title: 'Garden Veggie', price: '$6.50' },
                            { title: 'B.L.T.', price: '$6.50' },
                            { title: 'Turkey Ranch B.L.T.', price: '$7.25' },
                            { title: 'Smoked Salmon ', price: '$8.25' },
                        ].map((item, idx) => (
                            <Col key={idx}>
                                <Card style={{ width: '18rem', height: '14rem'}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                        <Button variant="primary">Add to Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>Specialty Sandwiches</Accordion.Header>
                <Accordion.Body>
                    Served on your choice of wrap of panini

                    <br />

                    <Row xs={1} md={4} className="g-4">
                        {[
                            { title: 'Chicken Caesar', price: '$7.25' },
                            { title: 'Tuna Melt', price: '$7.50' },
                            { title: "Kickin' Chicken", price: '$8.15' },
                            { title: 'Turkey Ranch B.L.T.', price: '$8.15' },
                            { title: 'Chicken Cheddar Ranch', price: '8.15' },
                            { title: 'Buffalo Chicken', price: '$8.15' },
                            { title: 'Three Cheese and Tomato', price: '$7.75' },
                            { title: 'Chicken Salad with Cheese', price: '$7.50' },
                            { title: 'Garden Veggie', price: '$7.50' },
                            { title: 'Chicken Popper', price: '$8.15' },
                        ].map((item, idx) => (
                            <Col key={idx}>
                                <Card style={{ width: '18rem', height: '14rem'}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                        <Button variant="primary">Add to Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
                <Accordion.Header>Local Favorites</Accordion.Header>
                <Accordion.Body>
                    Delicious hot and ready to go local favorites.

                    <br />

                    <Row xs={1} md={4} className="g-4">
                        {[
                            { title: 'Hot Dog Bagel', price: '$3.10' },
                            { title: 'Hot Dog Bagel with Cheese', price: '$3.40' },
                            { title: 'Pizza Bagel', price: '$1.90' },
                            { title: 'Pizza Bagel with Pepperoni', price: '$2.10' },
                        ].map((item, idx) => (
                            <Col key={idx}>
                                <Card style={{ width: '18rem', height: '14rem'}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                        <Button variant="primary">Add to Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
                <Accordion.Header>Hot Coffee and Tea</Accordion.Header>
                <Accordion.Body>
                    We fresh brew Boston’s Best Coffee. We also sell coffee pods
                    and coffee bags.

                    <br />

                    <Row xs={1} md={4} className="g-4">
                        {[
                            { title: 'Small', price: '$1.70' },
                            { title: 'Medium', price: '$1.90' },
                            { title: 'Large', price: '$2.10' },
                        ].map((item, idx) => (
                            <Col key={idx}>
                                <Card style={{ width: '18rem', height: '14rem'}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                        <Button variant="primary">Add to Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
                <Accordion.Header>Specialty Drinks</Accordion.Header>
                <Accordion.Body>
                    We will prepare for you a cool or a hot specialty
                    drink to either cool you off or warm you up.

                    <br />

                    <Row xs={1} md={4} className="g-4">
                        {[
                            { title: 'Hot or Iced Latte', price: '$3.65' },
                            { title: 'Hot or Iced Chai Tea', price: '3.65' },
                            { title: 'Frozen Chai Tea', price: '$4.40' },
                            { title: 'Smoothie', price: '$4.40' },
                            { title: 'Frappe', price: '$4.40' },
                            { title: 'Frozen Hot Chocolate', price: '$4.40' },
                            { title: 'Fresh Fruit Protein Shake', price: '$6.50' },
                            { title: 'Hot Chocolate', price: '$3.15' },
                        ].map((item, idx) => (
                            <Col key={idx}>
                                <Card style={{ width: '18rem', height: '14rem'}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                        <Button variant="primary">Add to Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

        <Button variant="primary" className="mt-3">Place Order</Button>
    </>
}