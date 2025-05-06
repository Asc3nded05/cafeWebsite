import { Card, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import SelectToasted from './SelectToasted';
import SelectCreamCheese from './selectCreamCheese';
import SelectBagel from './selectBagel';
import SelectSandwichToppings from './SelectSandwichToppings';
import SelectMultipleBagels from './selectMultipleBagels';
import SelectDrinkFlavor from './SelectDrinkFlavor';
import SelectSmoothieFlavor from './SelectSmoothieFlavor';
import SelectWrapOrPanini from './SelectWrapOrPanini';
import SelectSausageBaconOrHam from './SelectSausageBaconOrHam';
import SelectButterOrJelly from './selectButterOrJelly';
import SelectHotorIced from './selectHotorIced';

//excepts the data of a menu item
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
    selectHotorIced
}) {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    //finds if an item has any of these options
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
        selectWrapOrPanini || 
        selectHotorIced;

    function handleShowModal() {
        setShowModal(true); // Show the modal
    }

    function handleCloseModal() {
        setShowModal(false); // Hide the modal
    }
    //sends to backend to delete
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
                    alert("Menu item deleted succesfully");
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
        selectHotorIced
    });

    //updated item
    function handleUpdateItem() {
        const updatedItem = {
            id,
            title: updatedTitle,
            price: updatedPrice,
            ...updatedOptions,
        };
        //updates item to the backend
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
                    alert("Menu item updated successfully");
                } else {
                    throw new Error('Error updating the menu item');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    // Format the price to two decimal places with a dollar sign
    const formattedPrice = `$${parseFloat(price).toFixed(2)}`;

    return (
        <>
            <Card style={{ width: '18rem', height: '14rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{formattedPrice}</Card.Subtitle>
                    {hasOptions && (
                        <div className="d-flex flex-column gap-2">
                            <Button variant="primary" onClick={handleShowModal}>
                                Show Order Options
                            </Button>
                            <div className="d-flex justify-content-between">
                                <Button variant="primary" onClick={() => setShowUpdateModal(true)}>
                                    Update
                                </Button>
                                <Button variant="danger" onClick={deleteItem}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )}
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
                        {selectHotorIced && <SelectHotorIced onChange={(value) => console.log("Hot or Iced", value)} />}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Exit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {/*Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*Title */}
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
                        {/*Price */}
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            value={updatedPrice}
                            onChange={(e) => setUpdatedPrice(e.target.value)}
                        />
                    </div>
                    {/*Bagel Option */}
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
                    {/*Butter or Jelly Options */}
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
                    {/*Cream Cheese Options */}
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
                    {/*Drink Flavor Options */}
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
                    {/*Multiple Bagel Options */}
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
                    {/*Sandwhich Toppings Options */}
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
                    {/*Meat Options */}
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
                    {/*Smoothie Flavor Options */}
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
                    {/*Toasted Options */}
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
                    {/*Wrap or Panini Option */}
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
                    {/*Drink Top Option */}
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectHotOrIced"
                            checked={updatedOptions.selectHotorIced}
                            onChange={(e) => setUpdatedOptions({ ...updatedOptions, selectHotorIced: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="selectHotOrIced">Select Hot or Iced</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/*Cancel Button */}
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancel
                    </Button>
                    {/*Save Button */}
                    <Button variant="primary" onClick={handleUpdateItem}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}