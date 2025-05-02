export default function SelectSmoothieFlavor() {
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