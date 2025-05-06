export default function SelectButterOrJelly({ onChange }) {
    function handleSelection(e) {
        onChange(e.target.value); // Pass the selected value to the parent
    }

    return (
        <div>
            <h5>Select Butter or Jelly</h5>
            <div className="topping-options">
                {/* butter/jelly options */}
                {[
                    "Butter",
                    "Jelly"
                ].map((option, index) => (
                    //mps butter/jelly
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`topping${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="topping"
                            id={`topping${index}`}
                            value={option}
                            onChange={handleSelection}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}