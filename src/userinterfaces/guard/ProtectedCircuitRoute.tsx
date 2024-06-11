import { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../services/hooks/redux';

interface ProtectedCircuitRouteProp {
  children: ReactNode;
}

function ProtectedCircuitRoute({ children }: ProtectedCircuitRouteProp) {
  const user = useAppSelector((state) => state.auth.user);
  const { id } = useParams();

  return user?.verified ? children : <Navigate to={`/circuit/${id}`} />;
}

export default ProtectedCircuitRoute;
