export default function ContactForm() {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Contact Us</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Message Content</label>
                    <input type="text" className="form-control" id="content" required />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
    )
}