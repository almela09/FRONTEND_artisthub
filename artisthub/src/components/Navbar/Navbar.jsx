import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteToken } from "../../app/slices/userSlice";
import { decodeToken } from "react-jwt";
import { CButton } from "../CButton/CButton";
import "./Navbar.css";
import { useLocation } from 'react-router-dom'; 
import { useState } from "react"; 


export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Línea añadida: Estado para controlar el menú móvil
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Obtiene la ubicación actual

  const token = useSelector((state) => state.user.token);
  const decoded = decodeToken(token);

  const handleLogout = () => {
    dispatch(deleteToken());
    navigate("/");
  };

  const handleMobileMenuToggle = () => { // Línea añadida: Función para manejar el clic en la hamburguesa
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // No renderiza el navbar si la ruta es /login o /register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="bg-gray-800 fixed top-0 w-full z-40">
      <nav className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            <CButton path="/" title="Artist/hub" />
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <CButton path="/" title="Home" />
              </li>
              {!token && (
                <>
                  <li>
                    <CButton path="/register" title="Register" /> {/* Restaurado a /register */}
                  </li>
                  <li>
                    <CButton path="/login" title="Login" /> {/* Restaurado a /login */}
                  </li>
                </>
              )}
              {token && (
                <>
                  <li>
                    <CButton path="/profile" title="Profile" />
                  </li>
                  {decoded && decoded.roleName === "super_admin" && (
                    <li>
                      <CButton path="/admin" title="Admin" />
                    </li>
                  )}
                  <li>
                    <div className="customlink-design" onClick={handleLogout}>
                      Logout
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="md:hidden">
            <button onClick={handleMobileMenuToggle} className="outline-none mobile-menu-button"> {/* Línea modificada: Añadir evento onClick */}
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'} md:hidden`}> {/* Línea modificada: Clases dinámicas */}
          <ul className="mt-4 space-y-4">
            <li>
              <CButton path="/" title="Home" />
            </li>
            {!token && (
              <>
                <li>
                  <CButton path="/register" title="Register" /> {/* Restaurado a /register */}
                </li>
                <li>
                  <CButton path="/login" title="Login" /> {/* Restaurado a /login */}
                </li>
              </>
            )}
            {token && (
              <>
                <li>
                  <CButton path="/profile" title="Profile" />
                </li>
                {decoded && decoded.roleName === "super_admin" && (
                  <li>
                    <CButton path="/admin" title="Admin" />
                  </li>
                )}
                <li>
                  <div className="customlink-design" onClick={handleLogout}>
                    Logout
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;