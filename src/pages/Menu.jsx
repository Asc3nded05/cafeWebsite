import { Accordion, Row, Col } from 'react-bootstrap';
import MenuItem from '../components/MenuItem';

{/* When placing orders we need to include functionality to select which types of bagels the customer wants and a way to note if they want the bagel toasted or not */}
{/* Menu Items, descriptions, and prices from http://bagelsetc.biz/Bagelsetc_menu.pdf */}

export default function Menu() {
    const menuData = [
        {
            category: 'Fresh Baked Bagels',
            description: 'NY Style Bagels Made Fresh Daily.',
            items: [
                { title: 'Bagel', price: '$1.25' },
                { title: '1/2 Dozen Bagels', price: '$7.25' },
                { title: 'Dozen Bagels', price: '$17.99' },
                { title: 'Bagel with Cream Cheese', price: '$2.95' },
                { title: 'Bagel with Butter or Jelly', price: '$2.00' },
                { title: 'Bagel with Peanut Butter', price: '$2.85' },
            ],
        },
        {
            category: 'Home Made Cream Cheese',
            description: '8oz fresh made Cream Cheese tubs.',
            items: [
                { title: 'Plain', price: '$3.75' },
                { title: 'Light', price: '$3.75' },
                { title: 'Strawberry', price: '$3.75' },
                { title: 'Maple and Honey Walnut', price: '$3.75' },
                { title: 'Olive and Pimiento', price: '$3.75' },
                { title: 'Bacon and Scallion', price: '$3.75' },
                { title: 'Onion and Chive', price: '$3.75' },
                { title: 'Jalapeno', price: '$3.75' },
                { title: 'Vegetable', price: '$3.75' },
            ],
        },
        {
            category: 'Breakfast Sandwiches',
            description: 'Served all day on your choice of bagel or wrap.',
            items: [
                { title: 'Egg and Cheese', price: '$3.25' },
                { title: 'Egg and Cheese with Bacon, Sausage, or Ham', price: '$4.25' },
                { title: 'Egg and Cheese Wrap', price: '$6.29' },
                { title: 'Egg and Cheese Wrap with Bacon, Sausage, or Ham', price: '$7.29' },
            ],
        },
        {
            category: 'Bagel Sandwiches',
            description:
                'Served on your choice of bagel with any of the following: Lettuce, tomato, onion, sprouts, cheese and choice of dressing. Roasted Red peppers & banana peppers .50 extra.',
            items: [
                { title: 'Ham', price: '$5.95' },
                { title: 'Turkey', price: '$5.95' },
                { title: 'Chicken Salad', price: '$5.95' },
                { title: 'Tuna Salad', price: '$5.95' },
                { title: 'Garden Veggie', price: '$6.50' },
                { title: 'B.L.T.', price: '$6.50' },
                { title: 'Turkey Ranch B.L.T.', price: '$7.25' },
                { title: 'Smoked Salmon', price: '$8.25' },
            ],
        },
        {
            category: 'Specialty Sandwiches',
            description: 'Served on your choice of wrap or panini.',
            items: [
                { title: 'Chicken Caesar', price: '$7.25' },
                { title: 'Tuna Melt', price: '$7.50' },
                { title: "Kickin' Chicken", price: '$8.15' },
                { title: 'Turkey Ranch B.L.T.', price: '$8.15' },
                { title: 'Chicken Cheddar Ranch', price: '$8.15' },
                { title: 'Buffalo Chicken', price: '$8.15' },
                { title: 'Three Cheese and Tomato', price: '$7.75' },
                { title: 'Chicken Salad with Cheese', price: '$7.50' },
                { title: 'Garden Veggie', price: '$7.50' },
                { title: 'Chicken Popper', price: '$8.15' },
            ],
        },
        {
            category: 'Local Favorites',
            description: 'Delicious hot and ready-to-go local favorites.',
            items: [
                { title: 'Hot Dog Bagel', price: '$3.10' },
                { title: 'Hot Dog Bagel with Cheese', price: '$3.40' },
                { title: 'Pizza Bagel', price: '$1.90' },
                { title: 'Pizza Bagel with Pepperoni', price: '$2.10' },
            ],
        },
        {
            category: 'Hot Coffee and Tea',
            description: 'We fresh brew Boston’s Best Coffee. We also sell coffee pods and coffee bags.',
            items: [
                { title: 'Small', price: '$1.70' },
                { title: 'Medium', price: '$1.90' },
                { title: 'Large', price: '$2.10' },
            ],
        },
        {
            category: 'Specialty Drinks',
            description: 'We will prepare for you a cool or a hot specialty drink to either cool you off or warm you up.',
            items: [
                { title: 'Hot or Iced Latte', price: '$3.65' },
                { title: 'Hot or Iced Chai Tea', price: '$3.65' },
                { title: 'Frozen Chai Tea', price: '$4.40' },
                { title: 'Smoothie', price: '$4.40' },
                { title: 'Frappe', price: '$4.40' },
                { title: 'Frozen Hot Chocolate', price: '$4.40' },
                { title: 'Fresh Fruit Protein Shake', price: '$6.50' },
                { title: 'Hot Chocolate', price: '$3.15' },
            ],
        },
    ];

    return (
        <>
            <h1>Menu</h1>
            <Accordion defaultActiveKey="0">
                {menuData.map((category, idx) => (
                    <Accordion.Item eventKey={idx.toString()} key={idx}>
                        <Accordion.Header>{category.category}</Accordion.Header>
                        <Accordion.Body>
                            <p>{category.description}</p>
                            <Row xs={1} md={4} className="g-4">
                                {category.items.map((item, itemIdx) => (
                                    <Col key={itemIdx}>
                                        <MenuItem title={item.title} price={item.price} />
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