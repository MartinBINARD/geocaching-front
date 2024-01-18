import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

// import of picture and icons for the homepage
import illustration from '../../assets/images/illustration.png';
import Footer from '../../components/Footer/Footer';

function Homepage() {
  return (
    <>
      <div className="flex flex-col justify-center z-10 items-center lg:flex-row m-auto lg:gap-20">
        <img
          className="max-h-[35vh] m-auto lg:m-5 sm:max-h-[50vh] lg:max-h-[75vh]"
          src={illustration}
          alt="illustration de l'application"
        />
        <section className="flex flex-col gap-10 w-3/4 lg:w-1/3 text-primary">
          <h3 className="font-bold text-4xl">
            Découvre le monde sous un
            <span className="text-accent ml-2">nouvel angle</span>
          </h3>
          <p className="text-xl">
            Rejoins la communauté des explorateurs de
            <span className="font-bold italic ml-2">CachTrek</span>, parcours
            des endroits étonnants et apprend tout en t&apos;amusant !
          </p>
          <Link
            className="flex w-max items-center gap-2 border rounded-md btn btn-primary btn-lg normal-case text-2xl font-medium text-white"
            to="/presentation"
          >
            <Compass size={34} />
            Découvrir
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
