import { Card, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import SelectToasted from './SelectToasted';
import SelectCreamCheese from './selectCreamCheese';
import SelectBagel from './selectBagel';
import SelectSandwichToppings from './selectSandwichToppings';
import SelectMultipleBagels from './selectMultipleBagels';
import SelectDrinkFlavor from './SelectDrinkFlavor';
import SelectSmoothieFlavor from './SelectSmoothieFlavor';
import SelectWrapOrPanini from './SelectWrapOrPanini';
import CommentOption from './CommentOption';

export default function MenuItemUser({
    title,
    price,
    selectBagel,
    selectButterOrJelly,
    selectToasted,
    selectCreamCheese,
    selectSandwichToppings,
    selectMultipleBagels,
    selectSausageBaconOrHam,
    selectDrinkFlavor,
    selectSmoothieFlavor,
    selectWrapOrPanini,
    addItemToOrder, // Function to add an item to the current order
}) {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [orderOptions, setOrderOptions] = useState({}); // State to store user selections
    const [comment, setComment] = useState("");

    function handleShowModal() {
        // Check if the item has any options
        const hasOptions =
            selectBagel ||
            selectButterOrJelly ||
            selectToasted ||
            selectCreamCheese ||
            selectSandwichToppings ||
            selectMultipleBagels ||
            selectSausageBaconOrHam ||
            selectDrinkFlavor ||
            selectSmoothieFlavor ||
            selectWrapOrPanini;
    
        if (hasOptions) {
            setShowModal(true); // Show the modal if options are available
        } else {
            handleAddItem(); // Add the item directly if no options are available
        }
    }
    
    function handleCloseModal() {
        setShowModal(false); // Hide the modal
    }

    const handleCommentChange = (commentValue) => {
        setComment(commentValue);
      };
    

    function handleOptionChange(optionName, value) {
        console.log(optionName);
        setOrderOptions((prevOptions) => ({
            ...prevOptions,
            [optionName]: value,
        }));
    }

    function handleAddItem() {
        console.log(orderOptions)
        const newItem = {
            itemName: title,
            price: price,
            options: orderOptions,
            comment: comment,
        };

        addItemToOrder(newItem); // Add the item to the current order
        setShowModal(false); // Close the modal
        setOrderOptions({}); // Reset options for the next item
        setComment("")
    }

    return (
        <>
            <Card style={{ width: '18rem', height: '14rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                    <Button variant="primary" onClick={handleShowModal}>
                        Add to Order
                    </Button>
                </Card.Body>
            </Card>

            {/* Modal for selecting order options */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Order Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Dynamically render components based on props */}
                    {selectBagel && <SelectBagel onChange={(value) => handleOptionChange('selectBagel', value)} />}
                    {selectButterOrJelly && <selectButterOrJelly onChange={(value) => handleOptionChange('selectButterOrJelly', value)} />}
                    {selectToasted && <SelectToasted onChange={(value) => handleOptionChange('selectToasted', value)} />}
                    {selectCreamCheese && <SelectCreamCheese onChange={(value) => handleOptionChange('selectCreamCheese', value)} />}
                    {selectSandwichToppings && <SelectSandwichToppings onChange={(value) => handleOptionChange('selectSandwichToppings', value)} />}
                    {selectMultipleBagels && <SelectMultipleBagels title={title} onChange={(value) => handleOptionChange('selectMultipleBagels', value)} />}
                    {selectSausageBaconOrHam && <selectSausageBaconOrHam onChange={(value) => handleOptionChange('selectSausageBaconOrHam', value)} />}
                    {selectDrinkFlavor && <SelectDrinkFlavor onChange={(value) => handleOptionChange('selectDrinkFlavor', value)} />}
                    {selectSmoothieFlavor && <SelectSmoothieFlavor onChange={(value) => handleOptionChange('selectSmoothieFlavor', value)} />}
                    {selectWrapOrPanini && <SelectWrapOrPanini onChange={(value) => handleOptionChange('selectWrapOrPanini', value)} />}
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddItem}>
                        Add Item
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}