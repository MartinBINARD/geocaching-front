// import of Outlet from react-router-dom that will be remplace by pages in router.jsx
import { Outlet } from 'react-router-dom';

// import of components that will stay in every pages of our site
import Header from '../Header/Header';
import Toast from '../Toast/Toast';

import './App.css';

// create an app component that will be the first structure of our site
function App() {
  return (
    <div className="App font-body">
      <Header />
      <Toast />
      <Outlet />
    </div>
  );
}

export default App;
