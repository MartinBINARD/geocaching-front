import logo from '../assets/logo/compass.png';

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <img className="animate-spin h-16" src={logo} alt="loader" />
      <h2>Chargement en cours...</h2>
    </div>
  );
}

export default Loader;
