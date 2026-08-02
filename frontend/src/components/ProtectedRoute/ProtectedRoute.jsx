import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '../../hooks/useAuth/useAuth.js';
import Loader from '../Loader/Loader.jsx';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
