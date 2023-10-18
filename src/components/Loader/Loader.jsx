// import picture for the loader

// building a componant Loader that we will call everytime we are pending for API call
function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h2>Chargement en cours...</h2>
    </div>
  );
}

export default Loader;
