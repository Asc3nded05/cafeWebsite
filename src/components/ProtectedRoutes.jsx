import { jwtDecode } from 'jwt-decode';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ role, children, defaultPage }) {
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  if (!token) {
    return <>{defaultPage}</>;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRoleFromToken = decodedToken?.role;

    if (userRoleFromToken === role) {
      return <>{children}</>;
    } else {
      return <>{defaultPage}</>;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('authToken');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;