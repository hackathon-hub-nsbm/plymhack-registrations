import Image from "next/image";
import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center md:items-start rounded-lg bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-sm border border-purple-500/30 p-4 text-xs gap-4">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/assets/hackothon.jpg"
          alt="Hackathon Hub Logo"
          width={60}
          height={60}
          className="rounded-md shadow-lg"
        />
        <div className="text-left">
          <p className="font-bold text-white text-sm">Hackathon Hub NSBM</p>
          <p className="text-xs text-gray-400">L2-206, B2 Floor, FOC</p>
        </div>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full">
        <Link
          href="https://www.instagram.com/hackathonhub.nsbm/"
          target="_blank"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-pink-600/20 hover:bg-pink-600/40 border border-pink-500/30 hover:border-pink-500 transition-all"
        >
          <IoLogoInstagram className="text-pink-400" size={16} />
          <span className="text-xs text-gray-300">Instagram</span>
        </Link>

        <Link
          href="https://www.linkedin.com/company/hackathon-hub-nsbm/"
          target="_blank"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 hover:border-blue-500 transition-all"
        >
          <FaLinkedin className="text-blue-400" size={16} />
          <span className="text-xs text-gray-300">LinkedIn</span>
        </Link>

        <Link
          href="https://web.facebook.com/people/Hackathon-Hub/61556983036529/"
          target="_blank"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-700/20 hover:bg-blue-700/40 border border-blue-600/30 hover:border-blue-600 transition-all"
        >
          <FaFacebookSquare className="text-blue-400" size={16} />
          <span className="text-xs text-gray-300">Facebook</span>
        </Link>

        <Link
          href="https://github.com/hackathon-hub-nsbm/"
          target="_blank"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-700/20 hover:bg-gray-700/40 border border-gray-600/30 hover:border-gray-500 transition-all"
        >
          <FaGithub className="text-gray-300" size={16} />
          <span className="text-xs text-gray-300">GitHub</span>
        </Link>
      </div>

    </footer>
  );
};

export default Footer;
