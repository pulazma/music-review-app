import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  // Если не авторизован — редиректим на страницу входа
  return user ? children : <Navigate to="/login" replace />;
}
