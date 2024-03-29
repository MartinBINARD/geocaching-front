import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';

import { logout } from '../store/reducers/auth';

interface ProtectedRouteProp {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProp) {
  const isProfileDelete = useAppSelector((state) => state.user.isProfileDelete);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isProfileDelete) {
      dispatch(logout());
    }
  }, [isProfileDelete, dispatch]);

  return user?.verified ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
