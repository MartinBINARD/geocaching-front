import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import koala picture
// import scss file
import './Dashboard.scss';

function Dashboard() {
  const user = useSelector((state) => state.settings.user);

  return (
    <>
      <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-paragraph">
          Salutations administrateur des explorateurs du passé et de la nature !
        </p>
        <p className="dashboard-paragraph">
          Vous vous trouvez dans le dashboard de Caching&apos;O. Grâce à cette
          console vous pourrez ajouter, modifier ou même supprimer des circuits
          !
        </p>
        <section className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col justify-center items-center gap-5 p-4">
            <Link className="dashboard-button" to="/admin/create">
              Ajouter un parcours
            </Link>
            <Link className="dashboard-button" to="/admin/patch">
              Modifier un parcours
            </Link>
            <Link className="dashboard-button" to="/admin/delete">
              Supprimer un parcours
            </Link>
          </div>
        </section>
      </div>
      {user?.role !== 'admin' && <Navigate to="/" />}
    </>
  );
}

export default Dashboard;
