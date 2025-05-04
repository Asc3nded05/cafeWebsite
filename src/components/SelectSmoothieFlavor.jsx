import { useEffect, useState } from "react";
    export default function SelectSmoothieFlavor({onChange}) {
    const [selectedSmoothieFlavor, setSelectedSmoothieFlavor] = useState('Strawberry-Bannana'); // Track the selected bagel

    const handleChange = (event) => {
        const SmoothieFlavor = event.target.value;
        setSelectedSmoothieFlavor(SmoothieFlavor); // Update state
        onChange(SmoothieFlavor);       // Call the onChange prop!
      };

          useEffect(() => {
            onChange("Strawberry-Bannana");
          }, []); 
       
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
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
