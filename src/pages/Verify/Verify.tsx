import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { verify } from '../../store/reducers/settings';

function Verify() {
  // Init dispatch and location and use URLSearchParams to get the token
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token: string | null = searchParams.get('token');

  const isVerified = useAppSelector((state) => state.settings.isVerified);

  useEffect(() => {
    if (token) {
      dispatch(verify(token));
    }
  }, [dispatch, token]);

  if (isVerified) {
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

export default Verify;
