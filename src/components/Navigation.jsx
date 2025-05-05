import { Link } from "react-router-dom";

export default function Navigation() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light light-green fixed-top">
			<div className="container-fluid">
				{/* Logo and Title */}
				<Link className="navbar-brand" to="/">
					<img
						src="src\assets\BagelLogoRectangular.png"
						alt="Logo"
						width="auto"
						height="30"
						className="d-inline-block align-text-top"
					/>
					&nbsp; Bagels Etc.
				</Link>

				{/* Toggle Button for Mobile View */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Navigation Links */}
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/menu">
								Menu
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/contact">
								Contact
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/blog">
								Blog
							</Link>
						</li>
						{/* Login Button */}
						<li className="nav-item">
							<Link className="btn btn-outline-primary me-2" to="/login">
								Login
							</Link>
						</li>
						{/* Create New Account Button */}
						<li className="nav-item">
							<Link className="btn btn-primary" to="/createAccount">
								Create Account
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};