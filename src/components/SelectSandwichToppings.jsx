export default function SelectSandwichToppings() {
    return (
        <div>
            <h5>Select Toppings</h5>
            <div className="topping-options">
                {[
                    "Lettuce",
                    "Tomato",
                    "Onion",
                    "Sprouts",
                    "Cheese",
                    "Ranch",
                    "Mayo",
                    "Roasted Red Peppers",
                    "Bannana Peppers"
                ].map((option, index) => (
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`topping${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="topping"
                            id={`topping${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}