import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Privacy() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="flex flex-col justify-center mx-auto gap-4 lg:w-2/3 p-4">
      <h2 className="font-bold text-2xl text-center my-6">
        Conditions et politiques spécifiques
      </h2>
      <h3 className="font-bold text-xl">
        Utilisation des données personnelles
      </h3>
      <p>
        Selon le décret 2021-1363 sur la conservation des données aux fins de
        sauvegarde de la sécurité nationale, l’application GeoCacheTrek se doit
        – en tant qu’intermédiaire technique – de conserver :
      </p>
      <ul>
        <li>
          - Pendant une durée de 5 ans « à compter de la fin de validité du
          contrat utilisateur », ou pendant une durée d’1 an « à compter de la
          clôture de son compte » l’identité civile de l’utilisateur
          (pseudonyme, mot de passe, adresse IP, autres informations à caractère
          personnel) ;
        </li>
        <li>
          - Pendant une durée d’1 an les « catégories de données de trafic et de
          localisation » de l’utilisateur.
        </li>
      </ul>
      <h3 className="font-bold text-xl">Cookies</h3>
      <p>
        GeoCacheTrek n’utilise que les cookies strictement nécessaires au bon
        fonctionnement de l’application.
      </p>
      <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
        {/* <img className="xl:w-1/4 w-1/2" src={icon} alt="icon de attention" /> */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Responsabilités</h3>
          <p>
            Les problèmes liés à un accès limité au réseau internet
            (encombrement du réseau, accès aux informations, transfert de
            données, rupture de transmission, etc.) ne relèvent pas de la
            responsabilité de GeoCacheTrek.
          </p>
          <p>
            Le joueur s’engage à choisir un parcours adapté à son âge, à sa
            condition physique ainsi qu’à ceux de ses accompagnants.
          </p>
          <p>
            Le joueur s’engage à respecter les propriétés privées et à ne les
            dégrader d’aucune manière.
          </p>
          <p>
            Le joueur s’engage à respecter les lieux publics et à ne les
            dégrader d’aucune manière.
          </p>
          <p>
            Le joueur est responsable de sa sécurité et s’engage à respecter le
            code de la route, quel que soit son type de mobilité.
          </p>
        </section>
      </div>
    </section>
  );
}

export default Privacy;
