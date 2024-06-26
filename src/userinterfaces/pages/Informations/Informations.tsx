// import footer componant
import { Footprints, Navigation, Sprout, UnlockKeyhole } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
// import icons and member's illustrations

function Informations() {
  return (
    <div className="flex-grow-1 flex flex-col mt-auto">
      <section className="flex flex-col m-auto p-8">
        <div className="flex self-center gap-2">
          <h2 className="font-bold text-2xl text-center mt-10 mb-20 lg:text-4xl">
            Informations pratiques
          </h2>
        </div>
        <section className="flex flex-col xl:flex-row lg:justify-center items-center xl:items-start text-lg gap-20 mb-5 pb-10 align-top">
          <section className="max-w-sm flex flex-col items-center">
            <UnlockKeyhole className="w-24 h-24 text-yellow-400" />
            <h3 className="font-bold text-xl my-3 lg:text-2xl">Accès au jeu</h3>
            <p className="text-base text">
              L&apos;accès au parcours n&apos;est accordé qu&apos;aux
              utilisateurs ayant créé un compte.
            </p>
          </section>
          <section className="max-w-sm flex flex-col items-center">
            <Navigation className="w-24 h-24 text-blue-700" />
            <h3 className="font-bold text-xl my-3 lg:text-2xl">
              Géolocalisation
            </h3>
            <p className="text-base">
              Afin que le joueur puisse voir sa position sur la carte, il doit
              activer les données de géolocalisation de son mobile ou de sa
              tablette.
            </p>
          </section>
          <section className="max-w-sm flex flex-col items-center">
            <Footprints className="w-24 h-24 text-secondary" />
            <h3 className="font-bold text-xl my-3 lg:text-2xl">Les parcours</h3>
            <p className="text-base">
              Le jeu se déroule en intégralité sur le domaine public. Le joueur
              se doit de respecter les propriétés privées et à ne dégrader en
              aucune manière.
            </p>
            <p className="text-base self-start">
              Attention à choisir un parcours adapté à l&apos;âge et à la
              condition physique du joueur.
            </p>
          </section>
        </section>
        <section className="flex flex-col xl:flex-row xl:gap-10 xl:w-2/3 xl:shadow-lg xl:rounded-lg xl:p-6 items-center m-auto">
          <Sprout className="w-24 h-24 text-green-500" />
          <div className="flex flex-col items-center xl:items-start">
            <h3 className="font-bold text-xl my-3 lg:text-2xl">Génèse</h3>
            <p>
              Ce projet est né de la volonté de faire le lien entre un amour
              prononcé pour le patrimoine et la nature, avec le développement
              web. Le géocaching répond au besoin de susciter la curiosité d’un
              public divers envers des thématiques culturelles variées par des
              méthodes ludiques et modernes.
            </p>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default Informations;
