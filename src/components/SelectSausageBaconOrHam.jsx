export default function SelectSausageBaconOrHam({ onChange }) {
    function handleSelection(e) {
        onChange(e.target.value); // Pass the selected value to the parent
    }

    return (
        <div>
            <h5>Select Choice of Meat</h5>
            <div className="meat-options">
                {[
                    "Sausage",
                    "Bacon",
                    "Ham"
                ].map((option, index) => (
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`meat${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="meat"
                            id={`meat${index}`}
                            value={option}
                            onChange={handleSelection}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}