import React, { useEffect, useState } from 'react';

function SelectBagel({ onChange }) {
  const [selectedBagel, setSelectedBagel] = useState('Plain'); // Track the selected bagel

  const handleChange = (event) => {
    const bagelChoice = event.target.value;
    setSelectedBagel(bagelChoice); // Update state
    onChange(bagelChoice);       // Call the onChange prop!
  };

    useEffect(() => {
      onChange("plain");
    }, []); 
 
  return (
    <div>
      <h5>Select Bagel Flavor</h5>
      <div className="bagel-options">
        {[
          "Plain",
          "Sesame",
          "Everything",
          "Poppy",
          "Onion",
          "Salt",
          "Garlic",
          "Jalapeno",
          "Spinach",
          "Blueberry",
          "Cinnamon Raisin",
          "Cinnanon Sugar",
          "Wheat with Bran",
          "Oat with Bran",
          "Pumpernickel"
        ].map((option, index) => (
          <div key={index} className="form-check">
            <label className="form-check-label" htmlFor={`bagel${index}`}>
              {option}
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="bagel"
              id={`bagel${index}`}
              value={option} // Set the value of the radio button
              onChange={handleChange}     // Use our handleChange
              checked={selectedBagel === option}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectBagel;