import { Button } from "@mui/material";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

type PagesLinkTypes = {
  path?: string;
  name: string;
  children?: PagesLinkTypes[];
};

const pages: PagesLinkTypes[] = [
  {
    path: "/",
    name: "Accueil",
  },
  {
    name: "plateforme",
    children: [
      {
        path: "/entreprise",
        name: "entreprise",
      },
      {
        path: "/apprenant",
        name: "apprenant",
      },
    ],
  },
  {
    path: "/webinaires",
    name: "Webinaires",
  },
  {
    path: "/contact",
    name: "Contact",
  },
  {
    path: "/apropos",
    name: "A propos",
  },
];

type Props = {
  handleLogout: () => void;
};
const NavBar = ({ handleLogout }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClickPlateforme, setIsClickPlateforme] = useState(false);

  const { pathname: page } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text">
              TalentUp
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {pages.map((link) =>
            link.name === "plateforme" ? (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setIsClickPlateforme(true)}
                onMouseLeave={() => setIsClickPlateforme(false)}
              >
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                  Plateforme
                  <AiOutlineDown
                    size={16}
                    className={`transition-transform ${
                      isClickPlateforme ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <ul
                  className={`absolute top-full left-0 bg-white shadow-lg rounded-lg overflow-hidden ${
                    isClickPlateforme
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  } transition-all duration-300`}
                >
                  {link.children?.map((child) => (
                    <li
                      key={child.name}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Link
                        to={child.path as string}
                        className="block text-sm capitalize"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path as string}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  page === link.path && "text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* Bouton de déconnexion (grand écran) */}
          <Button variant="outlined" color="error" onClick={() => handleLogout}>
            Deconnexion
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 focus:outline-none transition-transform"
          >
            {!menuOpen ? (
              <IoMenuSharp size={24} className="text-gray-700" />
            ) : (
              <FaArrowRightLong size={20} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-64 h-screen bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col p-4 gap-4">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end p-2 bg-gray-200 rounded-md"
          >
            <FaArrowRightLong size={20} className="text-gray-700" />
          </button>

          {/* Links */}
          <nav className="flex flex-col gap-4">
            {pages.map((link) =>
              link.name === "plateforme" ? (
                <div key={link.name}>
                  <div
                    className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsClickPlateforme(!isClickPlateforme)}
                  >
                    <span>Plateforme</span>
                    <AiOutlineDown
                      size={16}
                      className={`transition-transform ${
                        isClickPlateforme ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  <ul
                    className={`overflow-hidden ${
                      isClickPlateforme ? "h-auto" : "h-0"
                    } transition-all duration-300`}
                  >
                    {link.children?.map((child) => (
                      <li
                        key={child.name}
                        className="pl-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Link
                          to={child.path as string}
                          className="block text-sm capitalize"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path as string}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Logout Button (mobile) */}
          <Button variant="outlined" color="error" onClick={() => handleLogout}>
            Deconnexion
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
