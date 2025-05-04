import { useState } from "react";

export default function SelectDrinkFlavor({onChange}) {
     const [selectedDrinkFlavor, setSelectedDrinkFlavor] = useState(''); // Track the selected bagel
    
      const handleChange = (event) => {
        const DrinkFlavor = event.target.value;
        setSelectedDrinkFlavor(DrinkFlavor); // Update state
        onChange(DrinkFlavor);       // Call the onChange prop!
      };
    return (
        <div>
            <h5>Select Flavor</h5>
            <div className="drink-flavor-options">
                {[
                    "Vanilla",
                    "Spiced"
                ].map((option, index) => (
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`drinkFlavor${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="drinkFlavor"
                            id={`drinkFlavor${index}`}
                            value={option} // Set the value of the radio button
                            onChange={handleChange}     // Use our handleChange
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}