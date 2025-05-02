import { jwtDecode } from 'jwt-decode';
import { Navigate, useLocation } from 'react-router-dom';
import Login from './LoginForm';

function ProtectedRoute({ role, children }) {
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRoleFromToken = decodedToken?.role;

    if (userRoleFromToken != "admin") return <NoPage />;

    return <>{children}</>;
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('authToken');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;