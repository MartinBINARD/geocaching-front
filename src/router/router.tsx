import { createBrowserRouter } from 'react-router-dom';

// import of all pages for our site
import App from '../components/App/App';
import Homepage from '../pages/Homepage/Homepage';
import Informations from '../pages/Informations/Informations';
import Presentation from '../pages/Presentation/Presentation';
import CircuitsList from '../pages/CircuitsList/CircuitsList';
import Circuit from '../pages/Circuit/Circuit';
import CircuitMap from '../pages/CircuitMap/CircuitMap';
import Privacy from '../pages/Privacy/Privacy';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import CheckUserAccountConfirmation from '../pages/CheckUserAccountConfirmation/CheckUserAccountConfirmation';
import AskNewPassword from '../pages/AskNewPassword/AskNewPassword';
import UpdateResetPassword from '../pages/UpdateResetPassword/UpdateResetPassword';
import Congrats from '../pages/Congrats/Congrats';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddCircuit from '../pages/AddCircuit/AddCircuit';
import PatchCircuits from '../pages/PatchCircuits/PatchCircuits';
import PatchCircuit from '../pages/PatchCircuit/PatchCircuit';
import DeleteCircuit from '../pages/DeleteCircuit/DeleteCircuit';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

// create an array with react-router-dom with all the paths and elements we will render
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
      },
      {
        path: '/circuit/:id/map',
        element: <CircuitMap />,
      },
      {
        path: '/circuit/:id/congrats',
        element: <Congrats />,
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
        element: <Profile />,
      },
      {
        path: '/ask-password',
        element: <AskNewPassword />,
      },
      {
        path: '/reset',
        element: <UpdateResetPassword />,
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

// export of router array
export default router;
