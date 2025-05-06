import { useEffect, useState } from "react";

export default function SelectHotorIced({onChange}) {
    const [selectedHotorIced, setSelectedHotorIced] = useState('Hot'); // Track the selected bagel
    
        const handleChange = (event) => {
            const HotorIced = event.target.value;
            setHotIced(HotorIced); // Update state
            onChange(HotorIced);       // Call the onChange prop!
          };

          useEffect(() => {
                      onChange("Hot");
                    }, []); 
    return (
        <div>
            <h5>Select Hot or Iced</h5>
            {/*drink type options*/}
            <div className="drink-type">
                {[
                    "Hot",
                    "Iced"
                ].map((option, index) => (
                    //maps options
                    <div key={index} className="form-check">
                        <label className="form-check-label" htmlFor={`DrinkType${index}`}>
                            {option}
                        </label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="drinkType"
                            id={`DrinkType${index}`}
                            value={option} // Set the value of the radio button
                            checked={selectedHotorIced === option}
                            onChange={handleChange}     // Use our handleChange
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}