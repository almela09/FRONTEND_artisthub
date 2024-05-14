// export const Navbar = ({ path, title }) => {
    
  
//     return (
//      <header class="bg-gray-800">
//     <nav class="container mx-auto px-6 py-3">
//       <div class="flex items-center justify-between">
//         <div class="text-white font-bold text-xl">
//           <a href="#">Artist/hub</a>
//         </div>
//         <div class="hidden md:block">
//           <ul class="flex items-center space-x-8">
//             <li><a href="#" class="text-white hover:text-gray-300">Home</a></li>
//             <li><a href="#" class="text-white hover:text-gray-300">Register</a></li>
//             <li><a href="#" class="text-white hover:text-gray-300">Login</a></li>
//           </ul>
//         </div>
//         <div class="md:hidden">
//           <button class="outline-none mobile-menu-button">
//             <svg class="w-6 h-6 text-white" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
//               <path d="M4 6h16M4 12h16M4 18h16"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       <div class="mobile-menu hidden md:hidden">
//         <ul class="mt-4 space-y-4">
//           <li><a href="#" class="block px-4 py-2 text-white bg-gray-900 rounded hover:text-gray-300">Home</a></li>
//           <li><a href="#" class="block px-4 py-2 text-white bg-gray-900 rounded hover:text-gray-300">About</a></li>
//           <li><a href="#" class="block px-4 py-2 text-white bg-gray-900 rounded hover:text-gray-300">Services</a></li>
//           <li><a href="#" class="block px-4 py-2 text-white bg-gray-900 rounded hover:text-gray-300">Contact</a></li>
//         </ul>
//       </div>
//     </nav>
//   </header>
//     );
//   };
  
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteToken } from "../../app/slices/userSlice"; 
import { decodeToken } from "react-jwt";
import { CButton } from "../CButton/CButton";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.user.token);
  const decoded = decodeToken(token);

  const handleLogout = () => {
    dispatch(deleteToken());
    navigate("/");
  };

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-6 py-3">
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
                    <CButton path="/register" title="Register" />
                  </li>
                  <li>
                    <CButton path="/login" title="Login" />
                  </li>
                </>
              )}
              {token && (
                <>
                  <li>
                    <CButton path="/profile" title="Profile" />
                  </li>
                  {decoded && decoded.roleName === 'super_admin' && (
                    <li>
                      <CButton path="/admin" title="Admin" />
                    </li>
                  )}
                  <li>
                    <div className="customlink-design" onClick={handleLogout}>Logout</div>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="md:hidden">
            <button className="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="mobile-menu hidden md:hidden">
          <ul className="mt-4 space-y-4">
            <li>
              <CButton path="/" title="Home" />
            </li>
            {!token && (
              <>
                <li>
                  <CButton path="/register" title="Register" />
                </li>
                <li>
                  <CButton path="/login" title="Login" />
                </li>
              </>
            )}
            {token && (
              <>
                <li>
                  <CButton path="/profile" title="Profile" />
                </li>
                {decoded && decoded.roleName === 'super_admin' && (
                  <li>
                    <CButton path="/admin" title="Admin" />
                  </li>
                )}
                <li>
                  <div className="customlink-design" onClick={handleLogout}>Logout</div>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
