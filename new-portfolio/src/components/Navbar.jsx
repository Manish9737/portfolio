import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  // const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const isActive = (path) => location.pathname === path ? "text-blue-400" : "text-white";

  return (
    <nav className="backdrop-blur bg-white/10 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-white hover:text-blue-400 transition duration-300">
          Manish.Dev
        </Link>

        <div className="hidden md:flex space-x-6 text-white">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          <Link to="/skills" className="hover:text-gray-300">Skills</Link>
          <Link to="/projects" className="hover:text-gray-300">Projects</Link>
          <Link to="/blogs" className="hover:text-gray-300">Blogs</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur text-white px-4 pb-4 space-y-3">
          <Link to="/" onClick={closeMenu} className="block hover:text-gray-300">Home</Link>
          <Link to="/profile" onClick={closeMenu} className="block hover:text-gray-300">Profile</Link>
          <Link to="/skills" onClick={closeMenu} className="block hover:text-gray-300">Skills</Link>
          <Link to="/projects" onClick={closeMenu} className="block hover:text-gray-300">Projects</Link>
          <Link to="/contact" onClick={closeMenu} className="block hover:text-gray-300">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
