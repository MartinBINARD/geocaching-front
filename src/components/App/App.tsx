import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Toast from '../Toast/Toast';

function App() {
  return (
    <div className="flex flex-col min-h-screen text-primary bg-white font-body">
      <Header />
      <Toast />
      <Outlet />
    </div>
  );
}

export default App;
