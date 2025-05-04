export default function SelectBagel({ onChange }) {
    function handleSelection(e) {
        onChange(e.target.value); // Pass the selected value to the parent
    }

    return (
        <div>
            <h5>Select Bagel Flavor</h5>
            <div className="bagel-options">
                {[
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
                ].map((option, index) => (
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`bagel${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="bagel"
                            id={`bagel${index}`}
                            value={option}
                            onChange={handleSelection}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}