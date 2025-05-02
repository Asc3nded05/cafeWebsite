export default function SelectCreamCheese() {
    return (
        <div>
            <h5>Select Cream Cheese</h5>
            <div className="cream-cheese-options">
                {[
                    "Plain",
                    "Light",
                    "Strawberry",
                    "Maple and Honey Walnut",
                    "Olive and Pimiento",
                    "Bacon and Scallion",
                    "Onion and Chive",
                    "Jalapeno",
                    "Vegetable"
                ].map((option, index) => (
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`creamCheese${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="creamCheese"
                            id={`creamCheese${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}