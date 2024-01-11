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
  Dashboard,
  AddCircuit,
  PatchCircuits,
  PatchCircuit,
  DeleteCircuit,
  ErrorPage,
} from '../pages';
import ProtectedProfileRoute from '../guard/ProtectedProfileRoute';

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
            element: <CircuitPath />,
          },
          {
            path: 'congrats',
            element: <CircuitCongrats />,
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
      {
        path: '/admin',
        element: <Dashboard />,
      },
      {
        path: '/admin/create',
        element: <AddCircuit />,
      },
      {
        path: '/admin/patch',
        element: <PatchCircuits />,
      },
      {
        path: '/admin/patch/:id',
        element: <PatchCircuit />,
      },
      {
        path: '/admin/delete',
        element: <DeleteCircuit />,
      },
    ],
  },
]);

export default router;
