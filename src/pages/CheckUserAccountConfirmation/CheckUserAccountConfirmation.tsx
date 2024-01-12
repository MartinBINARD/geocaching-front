import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { checkUserAccountConfirmation } from '../../store/reducers/auth';

function CheckUserAccountConfirmation() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token: string | null = searchParams.get('token');

  const isAccountConfirmed = useAppSelector(
    (state) => state.auth.isAccountConfirmed
  );

  useEffect(() => {
    if (token) {
      dispatch(checkUserAccountConfirmation(token));
    }
  }, [dispatch, token]);

  if (isAccountConfirmed) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="flex flex-col justify-center items-center m-auto lg:shadow-lg p-4">
      <h2 className="font-bold">La vérification à échoué !</h2>
      <p className="p-2">
        Assurez-vous de n&apos;avoir pas déjà vérifié ce compte !
      </p>
    </section>
  );
}

export default CheckUserAccountConfirmation;
