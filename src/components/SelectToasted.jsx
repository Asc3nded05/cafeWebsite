import { useState } from "react";

export default function SelectToasted({ onChange }) {
    const [toasted, setToasted] = useState(false); // State to control the toasted option

    function handleSelection(e) {
        setToasted(e.target.checked); // Update the toasted state based on the checkbox
        onChange(e.target.checked); // Pass the selected value to the parent
    }

    return (<>
        <h5>Select how you would like your bagel prepared</h5>
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={toasted}
                    // onChange={(e) => setToasted(e.target.checked)}
                    onChange={handleSelection}
                />
                &nbsp;Toasted
            </label>
        </div>
    </>)
}