export default function SelectDrinkFlavor() {
    return (
        <div>
            <h5>Select Flavor</h5>
            <div className="drink-flavor-options">
                {/*drink flavors */}
                {[
                    "Vanilla",
                    "Spiced"
                ].map((option, index) => (
                    //maps drink flavors
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`drinkFlavor${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="drinkFlavor"
                            id={`drinkFlavor${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}