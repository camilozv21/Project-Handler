import { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterModal } from "./RegisterModal";
import { LoginModal } from "./LoginModal";
import { jwtDecode } from "jwt-decode";
import { validateToken, removeToken } from "../utils/token";

export const NavigationBar = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const validToken = validateToken();

  const logOut = () => {
    removeToken();
    window.location.reload();
  }

  const token = localStorage.getItem("token");

  return (
    <header className='w-full sticky'>
      <nav className='flex items-center justify-between shadow sm:h-18 md:h-24 pr-2 py-1 pl-2 lg:px-5'>
        <article className='flex items-center mr-6'>
          <Link to='/' className='block lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70'>
            <div className=' max-w-xs'>
              <img src='https://res.cloudinary.com/dj5kafiwa/image/upload/v1700750978/assets/phlogo.png' alt='Logo de la empresa' className=' w-auto cursor-pointer' />
            </div>
          </Link>
        </article>
        <article className="flex items-center flex-shrink-0">
          {!validToken && (
            <>
              <Link
                to="/"
                className="no-underline text-sm md:text-base lg:text-lg text-black font-semibold md:ml-5"
                onClick={() => setShowLogin(true)}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/"
                className="no-underline text-sm md:text-base lg:text-lg text-black font-semibold ml-2 md:ml-5"
                onClick={() => setShowRegister(true)}
              >
                Registrarse
              </Link>
            </>
          )}
        </article>
        {token && (
          <div className="flex items-center mr-6">
            <Link
              to="/"
              className="no-underline text-sm md:text-base lg:text-lg text-black font-semibold ml-2 md:ml-5"
              onClick={() => logOut()}
            >
              Cerrar Sesión
            </Link>
            <img src='https://res.cloudinary.com/dj5kafiwa/image/upload/v1700750978/assets/default.png' alt='Imagen de usuario' className='w-10 h-10 rounded-full ml-2' />
          </div>
        )}
        <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
        <RegisterModal
          show={showRegister}
          onHide={() => setShowRegister(false)}
        />
      </nav>
    </header>
  );
};
