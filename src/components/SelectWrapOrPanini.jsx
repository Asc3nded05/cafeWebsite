export default function SelectWrapOrPanini() {
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
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}