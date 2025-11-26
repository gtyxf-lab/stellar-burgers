import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
