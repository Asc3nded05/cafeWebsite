import React, { useState } from 'react';

export default function SelectSandwichToppings({ onChange }) {
	const [selectedSandwichToppings, setSelectedSandwichToppings] = useState([]);

	const handleChange = (event) => {
		const toppingChoice = event.target.value;
		const isChecked = event.target.checked;

		if (isChecked) {
		setSelectedSandwichToppings((prevToppings) => [...prevToppings, toppingChoice]);
		} else {
		setSelectedSandwichToppings((prevToppings) =>
			prevToppings.filter((topping) => topping !== toppingChoice)
		);
		}
		onChange(isChecked ? [...selectedSandwichToppings,toppingChoice] : selectedSandwichToppings.filter((topping) => topping !== toppingChoice));
	};

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
			"Bannana Peppers",
			].map((option, index) => (
			<div key={index} className="form-check">
				<label className="form-check-label" htmlFor={`topping${index}`}>
				{option}
				</label>
				<input
				className="form-check-input"
				type="checkbox"
				name="topping"
				id={`topping${index}`}
				value={option}
				checked={selectedSandwichToppings.includes(option)} // Correct checked attribute
				onChange={handleChange}
				/>
			</div>
			))}
		</div>
		</div>
	);
}