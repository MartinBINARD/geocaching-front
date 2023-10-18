import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import footer componant
import Footer from '../../components/Footer/Footer';

// import icon
import logo from '../../assets/logo/compass.png';

function Presentation() {
  // useLocation to get pathname
  const { pathname } = useLocation();

  // useEffect hook to scroll to the top when the page is display
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex-grow-1 flex flex-col">
      <section className="m-8 flex flex-col m-auto p-4">
        <div className="flex self-center gap-2">
          <h2 className="font-bold text-4xl text-center mb-20">
            Comment jouer à Caching&apos;O ?
          </h2>
        </div>
        <section className="flex flex-col xl:flex-row items-center xl:items-start text-lg gap-20 mb-5 pb-10 align-top">
          <section className="max-w-sm flex flex-col items-center">
            <img className="w-44 mb-2" src={map} alt="compass" />
            <h3 className="font-bold text-2xl my-3">Choisis un parcours !</h3>
            <p className="text-base text">
              {' '}
              Chacun d’entre eux est lié à un thème (histoire, art, etc.) et à
              un niveau de difficulté.{' '}
            </p>
          </section>
          <section className="max-w-sm flex flex-col items-center">
            <img className="w-44 mb-2" src={compass} alt="compass" />
            <h3 className="font-bold text-2xl my-3">Laisse toi guider</h3>
            <p className="text-base">
              Suis la carte jusqu&apos;aux différentes étapes. À chaque point on
              te pose une question dont la réponse se trouve là où tu es.
            </p>
          </section>
          <section className="max-w-sm flex flex-col items-center">
            <img className="w-44 mb-2" src={reward} alt="compass" />
            <h3 className="font-bold text-2xl my-3">Vérifie tes réponses</h3>
            <p className="text-base">
              Tu as faux ? Tu as la possibilité de proposer d’autres réponses.
              Tu as tout juste ? Félicitations, tu as validé le parcours et
              gagné une récompense !
            </p>
            <p className="text-base self-start">
              Amuse-toi en les collectionnant toutes !
            </p>
          </section>
        </section>
        <section className="self-center p-4 m-1 text-primary shadow-lg rounded-lg">
          <div className="flex items-center gap-2">
            <img className="h-12" src={light} alt="ampoule" />
            <h3 className="font-bold">À savoir</h3>
          </div>
          <section className="lg:flex gap-20 p-4">
            <section className="px-5 lg:border-r border-b lg:border-b-0 border-primary lg:pr-10">
              <h4 className="mb-5">
                Le niveau de difficulté est déterminé par le type de questions :
              </h4>
              <ul className="flex flex-col gap-3 my-10 lg:my-0">
                <li className="flex gap-2 items-center">
                  <img className="h-8" src={starone} alt="étoile une branche" />
                  Très simple et accessible aux jeunes enfants
                </li>
                <li className="flex gap-2 items-center">
                  {/* <img
                    className="h-8"
                    src={startwo}
                    alt="étoile deux branches"
                  /> */}
                  Simple et accessible aux enfants de plus de 8 ans
                </li>
                <li className="flex gap-2 items-center">
                  {/* <img
                    className="h-8"
                    src={starthree}
                    alt="étoile trois branches"
                  /> */}
                  Moyen
                </li>
                <li className="flex gap-2 items-center">
                  {/* <img
                    className="h-8"
                    src={starfour}
                    alt="étoile quatre branches"
                  /> */}
                  Difficile
                </li>
                <li className="flex gap-2 items-center">
                  {/* <img
                    className="h-8"
                    src={starfive}
                    alt="étoile cinq branches"
                  /> */}
                  Très difficile
                </li>
              </ul>
            </section>
            <section>
              <h4 className="lg:m-0 lg:mb-5 m-5">
                Vérifie si tu es bien équipé pour le terrain à parcourir :
              </h4>
              <ul className="flex flex-col gap-3 p-2 my-10 lg:my-0">
                <li className="flex gap-2 items-center">
                  {/* <img className="h-8" src={starone} alt="étoile une branche" /> */}
                  Terrain plat
                </li>
                <li className="flex gap-2 items-center">
                  {/* <img
                    className="h-8"
                    src={startwo}
                    alt="étoile deux branches"
                  /> */}
                  Majoritairement plat
                </li>
                <li className="flex gap-2 items-center">
                  {/* <img
                    className="h-8"
                    src={starthree}
                    alt="étoile trois branches"
                  /> */}
                  Peut présenter des parties en relief
                </li>
                <li className="flex gap-2 items-center">
                  {/* <img
                    className="h-8"
                    src={starfour}
                    alt="étoile quatre branches"
                  /> */}
                  Majoritairement en relief
                </li>
                <li className="flex gap-2 items-center">
                  {/* <img
                    className="h-8"
                    src={starfive}
                    alt="étoile cinq branches"
                  /> */}
                  Relief escarpé
                </li>
              </ul>
            </section>
          </section>
        </section>
        <div className="flex justify-end">
          <Link
            className="flex items-center btn normal-case m-auto w-72 mt-10"
            to="/circuits"
          >
            <img className="h-10" src={logo} alt="logo CacheTrek" />
            Découvrir les parcours
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Presentation;
