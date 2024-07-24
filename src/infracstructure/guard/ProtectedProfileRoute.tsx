import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logoutThunk } from '../store/thunks';

interface ProtectedRouteProp {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProp) {
  const isProfileDelete = useAppSelector((state) => state.user.isProfileDelete);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isProfileDelete) {
      dispatch(logoutThunk());
    }
  }, [isProfileDelete, dispatch]);

  return user?.verified ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
