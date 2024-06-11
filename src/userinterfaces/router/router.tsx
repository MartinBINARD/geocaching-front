import { createBrowserRouter } from 'react-router-dom';

import App from '../components/App/App';
import {
  Homepage,
  Informations,
  Presentation,
  CircuitsList,
  Circuit,
  CircuitIntro,
  CircuitPath,
  CircuitCongrats,
  Privacy,
  Login,
  Register,
  Profile,
  CheckUserAccountConfirmation,
  ForgotPassword,
  UpdatePassword,
  ErrorPage,
} from '../pages';
import ProtectedProfileRoute from '../../guard/ProtectedProfileRoute';
import ProtectedCircuitRoute from '../../guard/ProtectedCircuitRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/presentation',
        element: <Presentation />,
      },
      {
        path: '/info',
        element: <Informations />,
      },
      {
        path: '/circuits',
        element: <CircuitsList />,
      },
      {
        path: '/circuit/:id',
        element: <Circuit />,
        children: [
          {
            index: true,
            element: <CircuitIntro />,
          },
          {
            path: 'path',
            element: (
              <ProtectedCircuitRoute>
                <CircuitPath />
              </ProtectedCircuitRoute>
            ),
          },
          {
            path: 'congrats',
            element: (
              <ProtectedCircuitRoute>
                <CircuitCongrats />
              </ProtectedCircuitRoute>
            ),
          },
        ],
      },
      {
        path: '/privacy-policy',
        element: <Privacy />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/verify',
        element: <CheckUserAccountConfirmation />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedProfileRoute>
            <Profile />
          </ProtectedProfileRoute>
        ),
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset',
        element: <UpdatePassword />,
      },
    ],
  },
]);

export default router;
