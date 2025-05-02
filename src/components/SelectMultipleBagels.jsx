import { useState } from "react";

export default function SelectMultipleBagels({ maxBagels }) {
    const bagelOptions = [
        "Plain",
        "Sesame",
        "Everything",
        "Poppy",
        "Onion",
        "Salt",
        "Garlic",
        "Jalapeno",
        "Spinach",
        "Blueberry",
        "Cinnamon Raisin",
        "Cinnamon Sugar",
        "Wheat with Bran",
        "Oat with Bran",
        "Pumpernickel"
    ];

    const [selectedBagels, setSelectedBagels] = useState({});
    const [totalBagels, setTotalBagels] = useState(0);

    function handleBagelChange(bagel, count) {
        const newSelectedBagels = { ...selectedBagels, [bagel]: count };
        const newTotalBagels = Object.values(newSelectedBagels).reduce((sum, val) => sum + val, 0);

        if (newTotalBagels <= maxBagels) {
            setSelectedBagels(newSelectedBagels);
            setTotalBagels(newTotalBagels);
        } else {
            alert(`You can only select up to ${maxBagels} bagels.`);
        }
    }

    return (
        <div>
            <h5>Select Bagel Flavors</h5>
            <div className="bagel-options">
                {bagelOptions.map((option, index) => (
                    <div key={index} className="form-group mb-2">
                        <label htmlFor={`bagel${index}`} className="form-label">
                            {option}
                        </label>
                        <input
                            type="number"
                            id={`bagel${index}`}
                            className="form-control"
                            min="0"
                            max={maxBagels}
                            value={selectedBagels[option] || 0}
                            onChange={(e) => handleBagelChange(option, parseInt(e.target.value) || 0)}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-3">
                <p>Total Bagels Selected: {totalBagels} / {maxBagels}</p>
                {totalBagels === maxBagels && <p className="text-success">Your selection is complete!</p>}
            </div>
        </div>
    );
}