import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import verufy from settings' reducer
import { verify } from '../../store/reducers/settings';

function Verify() {
  // Init dispatch and location and use URLSearchParams to get the token
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  // Get the verified state from the reducer
  const verified = useSelector((state) => state.settings.verified);

  // Call API to verify
  useEffect(() => {
    dispatch(verify(token));
  }, [dispatch, token]);

  // If the call is rejected
  if (!verified) {
    return (
      <section className="flex flex-col justify-center items-center m-auto lg:shadow-lg p-4">
        <h2 className="font-bold">La vérification à échoué !</h2>{' '}
        <p className="p-2">
          Assurez-vous de n&apos;avoir pas déjà vérifié ce compte !{' '}
        </p>
      </section>
    );
  }

  return verified && <Navigate to="/login" />;
}

export default Verify;
