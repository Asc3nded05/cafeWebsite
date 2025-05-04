import React, { useState, useEffect } from "react";

export default function SelectMultipleBagels({ title, onChange }) {
    const [selectedBagels, setSelectedBagels] = useState({});
    const [totalBagels, setTotalBagels] = useState(0);
    const maxBagels = title === "1/2 Dozen Bagels" ? 6 : 12;
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

    useEffect(() => {
        // Initialize totalBagels based on selectedBagels
        const initialTotal = Object.values(selectedBagels).reduce((sum, val) => sum + val, 0);
        setTotalBagels(initialTotal);
    }, [selectedBagels]);

    const handleBagelChange = (bagel, count) => {
        const newSelectedBagels = { ...selectedBagels };

        // Input validation: Ensure count is not negative
        const validCount = Math.max(0, count);

        newSelectedBagels[bagel] = validCount;

        const newTotalBagels = Object.values(newSelectedBagels).reduce((sum, val) => sum + val, 0);

        if (newTotalBagels <= maxBagels) {
            setSelectedBagels(newSelectedBagels);
            onChange(newSelectedBagels); // Send selectedBagels ONLY
        } else {
            alert(`You can only select up to ${maxBagels} bagels.`);
        }
    };

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
                            onChange={(e) => handleBagelChange(option, parseInt(e.target.value, 10) || 0)}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-3">
                <p>
                    Total Bagels Selected: {totalBagels} / {maxBagels}
                </p>
                {totalBagels === maxBagels && (
                    <p className="text-success">Your selection is complete!</p>
                )}
            </div>
        </div>
    );
}
