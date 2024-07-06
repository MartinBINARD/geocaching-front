import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './userinterfaces/router/router';

import store from './userinterfaces/store';
import './index.css';

// App is provided by the hook RouterProvider.
// The App is rendered in the key router as default page

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
