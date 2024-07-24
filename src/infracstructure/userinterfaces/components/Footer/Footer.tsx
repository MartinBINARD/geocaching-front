import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="p-4 flex z-10 mb-0 mt-10 gap-3 text-xs lg:text-sm lg:justify-between lg:bg-[#00453E] footer lg:text-white text-primary">
      <p className="inline">
        GeoCacheTrek © 2024 réalisé par
        <a
          href="https://martin-binard.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline ml-1"
        >
          Martin Binard
        </a>
      </p>
      <Link className="hover:underline" to="/privacy-policy">
        Conditions et politiques spécifiques
      </Link>
    </footer>
  );
}

export default Footer;
