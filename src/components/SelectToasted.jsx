import React, { useState, useEffect } from 'react';

export default function SelectToasted({ onChange }) {
  const [toasted, setToasted] = useState(false);

  useEffect(() => {
	onChange(false); // Inform parent of initial "untoasted" state
  }, []); // Empty dependency array - runs only once on mount

  const handleChange = (event) => {
	const isToasted = event.target.checked;
	setToasted(isToasted);
	onChange(isToasted);
  };

  return (
	<>
	  <h5>Select how you would like your bagel prepared</h5>
	  <div>	
		{/* makes toasted checkbox */}
		<label>
		  <input
			type="checkbox"
			checked={toasted}
			onChange={handleChange}
		  />
		  &nbsp;Toasted
		</label>
	  </div>
	</>
  );
}
