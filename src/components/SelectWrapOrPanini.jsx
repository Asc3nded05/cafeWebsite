import { useEffect, useState } from "react";

export default function SelectWrapOrPanini({onChange}) {
    const [selectedWrapOrPanini, setSelectedWrapOrPanini] = useState('Wrap'); // Track the selected bagel
    
        const handleChange = (event) => {
            const WrapOrPanini = event.target.value;
            setSelectedWrapOrPanini(WrapOrPanini); // Update state
            onChange(WrapOrPanini);       // Call the onChange prop!
          };

          useEffect(() => {
                      onChange("Wrap");
                    }, []); 
    return (
        <div>
            <h5>Select Wrap or Panini</h5>
            <div className="specialty-sandwich-options">
                {[
                    "Wrap",
                    "Panini"
                ].map((option, index) => (
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`specaltySandwich${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="specialtySandwich"
                            id={`specialtySandwich${index}`}
                            value={option} // Set the value of the radio button
                            checked={selectedWrapOrPanini === option}
                            onChange={handleChange}     // Use our handleChange
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}