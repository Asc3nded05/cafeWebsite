import { Card, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import SelectToasted from './selectToasted';
import SelectButterOrJelly from './selectButterOrJelly';
import SelectCreamCheese from './selectCreamCheese';
import SelectBagel from './selectBagel';
import SelectSandwichToppings from './selectSandwichToppings';
import SelectSausageBaconOrHam from './SelectSausageBaconOrHam';
import SelectMultipleBagels from './selectMultipleBagels';
import SelectDrinkFlavor from './SelectDrinkFlavor';
import SelectSmoothieFlavor from './SelectSmoothieFlavor';
import SelectWrapOrPanini from './SelectWrapOrPanini';

export default function MenuItemUser({
    title,
    price,
    selectBagel,
    selectButterOrJelly,
    selectToasted,
    selectCreamCheese,
    selectSandwichToppings,
    selectSausageBaconOrHam,
    selectMultipleBagels,
    selectDrinkFlavor,
    selectSmoothieFlavor,
    selectWrapOrPanini,
    addItemToOrder, // Function to add an item to the current order
}) {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [orderOptions, setOrderOptions] = useState({}); // State to store user selections

    const hasOptions =
        selectBagel ||
        selectButterOrJelly ||
        selectToasted ||
        selectCreamCheese ||
        selectSandwichToppings ||
        selectSausageBaconOrHam ||
        selectMultipleBagels ||
        selectDrinkFlavor ||
        selectSmoothieFlavor ||
        selectWrapOrPanini;

    function handleShowModal() {
        setShowModal(true); // Show the modal
    }

    function handleCloseModal() {
        setShowModal(false); // Hide the modal
    }

    function handleOptionChange(optionName, value) {
        setOrderOptions((prevOptions) => ({
            ...prevOptions,
            [optionName]: value,
        }));
    }

    function handleAddItem() {
        const newItem = {
            itemName: title,
            price: price,
            options: orderOptions, // Pass the selected options
        };

        addItemToOrder(newItem); // Add the item to the current order
        setShowModal(false); // Close the modal
        setOrderOptions({}); // Reset options for the next item
    }

    function handleDirectAdd() {
        const newItem = {
            itemName: title,
            price: price,
            options: {}, // No options since there are no additional selections
        };

        addItemToOrder(newItem); // Add the item directly to the order
    }

    return (
        <>
            <Card style={{ width: '18rem', height: '14rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                    <Button
                        variant="primary"
                        onClick={hasOptions ? handleShowModal : handleDirectAdd}
                    >
                        Add to Order
                    </Button>
                </Card.Body>
            </Card>

            {/* Modal for selecting order options */}
            {hasOptions && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Order Options</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Dynamically render components based on props */}
                        {selectBagel && <SelectBagel onChange={(value) => handleOptionChange('selectBagel', value)} />}
                        {selectButterOrJelly && <SelectButterOrJelly onChange={(value) => handleOptionChange('selectButterOrJelly', value)} />}
                        {selectToasted && <SelectToasted onChange={(value) => handleOptionChange('selectToasted', value)} />}
                        {selectCreamCheese && <SelectCreamCheese onChange={(value) => handleOptionChange('selectCreamCheese', value)} />}
                        {selectSandwichToppings && <SelectSandwichToppings onChange={(value) => handleOptionChange('selectSandwichToppings', value)} />}
                        {selectSausageBaconOrHam && <SelectSausageBaconOrHam onChange={(value) => handleOptionChange('selectSausageBaconOrHam', value)} />}
                        {selectMultipleBagels && <SelectMultipleBagels title={title} onChange={(value) => handleOptionChange('selectMultipleBagels', value)} />}
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
            )}
        </>
    );
}