export default function SelectToasted() {
    return <>
        <div>
            <label>
                <input
                type="checkbox"
                checked={toasted}
                onChange={(e) => setToasted(e.target.checked)}
                />
                Toasted?
            </label>
        </div>
    </>
}