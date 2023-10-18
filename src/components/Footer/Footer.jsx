import { Link } from 'react-router-dom';

// Building a footer componant with Link to privacy policy

function Footer() {
  return (
    <footer className="p-4 flex z-10 mb-0 mt-10 gap-3 text-xs lg:text-sm lg:justify-between lg:bg-[#00453E] footer lg:text-white text-primary">
      <p className="">CacheTrek © 2023</p>
      <Link className="hover:underline" to="/privacy-policy">
        Conditions et politiques spécifiques
      </Link>
    </footer>
  );
}

export default Footer;
