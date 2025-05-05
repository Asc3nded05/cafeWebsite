import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function CommentOption({ onChange }) {
	const [commentValue, setCommentValue] = useState(''); 

	const handleChange = (event) => {
		console.log("handling change")
		const newValue = event.target.value;
		console.log(newValue)
		setCommentValue(newValue);
		onChange(newValue);
	};

	return (
		<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
			<Form.Label>Comments</Form.Label>
			<Form.Control 
				as="textarea" 
				rows={3} 
				value={commentValue}
				onChange={handleChange} 
				
			/>
		</Form.Group>
	);
}

export default CommentOption;
