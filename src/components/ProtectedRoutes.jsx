import { jwtDecode } from 'jwt-decode';
import { Navigate, useLocation } from 'react-router-dom';
import Login from './LoginForm';

function ProtectedRoute({ role, children }) {
	const token = localStorage.getItem('authToken');
	const location = useLocation();
	//checks if user has a token ie logged in
	if (!token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	try {
		//decodes toke
		const decodedToken = jwtDecode(token);
		//parses role
		const userRoleFromToken = decodedToken?.role;


		//checls if role is admin
		if (userRoleFromToken != "admin") return <NoPage />;

		return <>{children}</>;
	} catch (error) {
		console.error('Error decoding token:', error);
		localStorage.removeItem('authToken');
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
}

export default ProtectedRoute;