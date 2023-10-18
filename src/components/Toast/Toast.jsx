import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// import react toastify library (toast and his css) for "toast" some infos to the user ("Connected" / "Register OK" ..)

function Toast() {
  return (
    <ToastContainer
      position="top-left"
      autoClose={2000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}

export default Toast;
