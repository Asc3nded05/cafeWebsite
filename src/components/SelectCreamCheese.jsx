import { useState } from "react";

export default function SelectCreamCheese({onChange}) {
    const [selectedCreamCheese, setCreamCheese] = useState(''); // Track the selected bagel
    
      const handleChange = (event) => {
        const creamCheeseChoice = event.target.value;
        setCreamCheese(creamCheeseChoice); // Update state
        onChange(creamCheeseChoice);       // Call the onChange prop!
      };
    return (
        
        <div>
            <h5>Select Cream Cheese</h5>
            <div className="cream-cheese-options">
                {/*cream cheese options */}
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
                    //maps cream cheese
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`creamCheese${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="creamCheese"
                            id={`creamCheese${index}`}
                            value={option} // Set the value of the radio button
                            onChange={handleChange}     // Use our handleChange
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}