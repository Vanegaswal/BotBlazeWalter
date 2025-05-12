import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../api/jwt';

const PrivateRoute = () => {
  const token = getToken();
  
  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
