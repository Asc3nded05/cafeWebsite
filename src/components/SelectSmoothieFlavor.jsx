export default function SelectSmoothieFlavor({ onChange }) {
    function handleSelection(e) {
        onChange(e.target.value); // Pass the selected value to the parent
    }

    return (
        <div>
            <h5>Select Smoothie Flavor</h5>
            <div className="smoothie-flavor-options">
                {[
                    "Strawberry-Bannana",
                    "Raspberry",
                    "Mango",
                    "Peach",
                ].map((option, index) => (
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`smoothieFlavor${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="smoothieFlavor"
                            id={`smoothieFlavor${index}`}
                            value={option}
                            onChange={handleSelection}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}