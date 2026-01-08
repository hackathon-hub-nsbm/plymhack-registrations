import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full relative">
      {/* Mysterious divider */}
      <div className="flex items-center justify-center mb-8">
        <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      <div className="glass-effect rounded-2xl mysterious-border p-8 text-center max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-[var(--font-orbitron)] text-purple-300 tracking-widest mb-2">
            HACKATHON HUB
          </h3>
          <p className="text-xs font-[var(--font-space-mono)] text-gray-500 tracking-wider">
            L2-206, B2 Floor, Faculty of Computing • NSBM Green University
          </p>
        </div>

        {/* Social links with mysterious styling */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Link
            href="https://www.instagram.com/hackathonhub.nsbm/"
            target="_blank"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     glass-effect border border-pink-500/30 
                     hover:border-pink-400 hover:mystery-glow
                     transition-all duration-300"
          >
            <IoLogoInstagram className="text-pink-400 group-hover:scale-110 transition-transform" size={18} />
            <span className="text-xs font-[var(--font-space-mono)] text-gray-300 tracking-wider uppercase">
              Instagram
            </span>
          </Link>

          <Link
            href="https://www.linkedin.com/company/hackathon-hub-nsbm/"
            target="_blank"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     glass-effect border border-blue-500/30 
                     hover:border-blue-400 hover:mystery-glow
                     transition-all duration-300"
          >
            <FaLinkedin className="text-blue-400 group-hover:scale-110 transition-transform" size={18} />
            <span className="text-xs font-[var(--font-space-mono)] text-gray-300 tracking-wider uppercase">
              LinkedIn
            </span>
          </Link>

          <Link
            href="https://web.facebook.com/people/Hackathon-Hub/61556983036529/"
            target="_blank"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     glass-effect border border-blue-600/30 
                     hover:border-blue-500 hover:mystery-glow
                     transition-all duration-300"
          >
            <FaFacebookSquare className="text-blue-400 group-hover:scale-110 transition-transform" size={18} />
            <span className="text-xs font-[var(--font-space-mono)] text-gray-300 tracking-wider uppercase">
              Facebook
            </span>
          </Link>

          <Link
            href="https://github.com/hackathon-hub-nsbm/"
            target="_blank"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     glass-effect border border-purple-500/30 
                     hover:border-purple-400 hover:mystery-glow
                     transition-all duration-300"
          >
            <FaGithub className="text-purple-300 group-hover:scale-110 transition-transform" size={18} />
            <span className="text-xs font-[var(--font-space-mono)] text-gray-300 tracking-wider uppercase">
              GitHub
            </span>
          </Link>
        </div>

        {/* Mysterious footer text */}
        <div className="border-t border-purple-500/20 pt-4">
          <p className="text-xs font-[var(--font-space-mono)] text-gray-600 tracking-widest">
            &gt;&gt; EXPLORING THE UNKNOWN SINCE 2024 &lt;&lt;
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
