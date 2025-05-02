import { useState } from "react";

export default function SelectToasted() {
    const [toasted, setToasted] = useState(false); // State to control the toasted option

    return (<>
        <div>
            <label>
                <input
                type="checkbox"
                checked={toasted}
                onChange={(e) => setToasted(e.target.checked)}
                />
                 &nbsp;Toasted
            </label>
        </div>
    </>)
}