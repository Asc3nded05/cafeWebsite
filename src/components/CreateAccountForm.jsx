export default function CreateAccountFomr() {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Create Account</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" required />
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    );
}