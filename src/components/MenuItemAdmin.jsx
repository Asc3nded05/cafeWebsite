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
import SelectSausageBaconOrHam from './SelectSausageBaconOrHam';
import SelectButterOrJelly from './selectButterOrJelly';

export default function MenuItemAdmin({
    id,
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
}) {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

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

    function handleShowModal() {
        setShowModal(true); // Show the modal
    }

    function handleCloseModal() {
        setShowModal(false); // Hide the modal
    }

    function deleteItem() {
        fetch(`http://localhost:5000/api/menu/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    location.reload(); // Reload the page after deletion
                } else {
                    throw new Error('Error deleting the menu item');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedPrice, setUpdatedPrice] = useState(price);
    const [updatedOptions, setUpdatedOptions] = useState({
        selectBagel,
        selectButterOrJelly,
        selectToasted,
        selectCreamCheese,
        selectSandwichToppings,
        selectMultipleBagels,
        selectSausageBaconOrHam,
        selectWrapOrPanini,
        selectDrinkFlavor,
        selectSmoothieFlavor,
    });

    function handleUpdateItem() {
        const updatedItem = {
            id,
            title: updatedTitle,
            price: updatedPrice,
            ...updatedOptions,
        };

        fetch(`http://localhost:5000/api/menu/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
            .then((response) => {
                if (response.ok) {
                    location.reload(); // Reload the page after updating
                } else {
                    throw new Error('Error updating the menu item');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    return (
        <>
            <Card style={{ width: '18rem', height: '14rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                    {hasOptions && (
                        <Button variant="primary" onClick={handleShowModal}>
                            Show Order Options
                        </Button>
                    )}
                    <Button variant="primary" className="ms-2" onClick={() => setShowUpdateModal(true)}>
                        Update
                    </Button>
                    <Button variant="danger" className="ms-2" onClick={deleteItem}>
                        Delete
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
                        {selectBagel && <SelectBagel onChange={(value) => console.log('Bagel:', value)} />}
                        {selectButterOrJelly && <SelectButterOrJelly onChange={(value) => handleOptionChange('selectButterOrJelly', value)} />}
                        {selectToasted && <SelectToasted onChange={(value) => console.log('Toasted:', value)} />}
                        {selectCreamCheese && <SelectCreamCheese onChange={(value) => console.log('Cream Cheese:', value)} />}
                        {selectSandwichToppings && <SelectSandwichToppings onChange={(value) => console.log('Toppings:', value)} />}
                        {selectMultipleBagels && <SelectMultipleBagels title={title} onChange={(value) => console.log('Multiple Bagels:', value)} />}
                        {selectSausageBaconOrHam && <SelectSausageBaconOrHam onChange={(value) => handleOptionChange('selectSausageBaconOrHam', value)} />}
                        {selectDrinkFlavor && <SelectDrinkFlavor onChange={(value) => console.log('Drink Flavor:', value)} />}
                        {selectSmoothieFlavor && <SelectSmoothieFlavor onChange={(value) => console.log('Smoothie Flavor:', value)} />}
                        {selectWrapOrPanini && <SelectWrapOrPanini onChange={(value) => console.log('Wrap or Panini:', value)} />}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Exit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            value={updatedPrice}
                            onChange={(e) => setUpdatedPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectBagel"
                            checked={updatedOptions.selectBagel}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectBagel: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectBagel">Select Bagel</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectButterOrJelly"
                            checked={updatedOptions.selectButterOrJelly}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectButterOrJelly: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectButterOrJelly">Select Butter Or Jelly</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectCreamCheese"
                            checked={updatedOptions.selectCreamCheese}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectCreamCheese: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectCreamCheese">Select Cream Cheese</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectDrinkFlavor"
                            checked={updatedOptions.selectDrinkFlavor}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectDrinkFlavor: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectDrinkFlavor">Select Drink Flavor</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectMultipleBagels"
                            checked={updatedOptions.selectMultipleBagels}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectMultipleBagels: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectMultipleBagels">Select Multiple Bagels</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectSandwichToppings"
                            checked={updatedOptions.selectSandwichToppings}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectSandwichToppings: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectSandwichToppings">Select Sandwich Toppings</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectSausageBaconOrHam"
                            checked={updatedOptions.selectSausageBaconOrHam}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectSausageBaconOrHam: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectSausageBaconOrHam">Select Sausage, Bacon, or Ham</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectSmoothieFlavor"
                            checked={updatedOptions.selectSmoothieFlavor}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectSmoothieFlavor: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectSmoothieFlavor">Select Smoothie Flavor</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectToasted"
                            checked={updatedOptions.selectToasted}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectToasted: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectToasted">Select Toasted</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectWrapOrPanini"
                            checked={updatedOptions.selectWrapOrPanini}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectWrapOrPanini: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectWrapOrPanini">Select Wrap or Panini</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateItem}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}