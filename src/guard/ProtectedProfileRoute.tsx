import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteProp {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProp) {
  const user = useAppSelector((state) => state.settings.user);

  return user?.verified ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
