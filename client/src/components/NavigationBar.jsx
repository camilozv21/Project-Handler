import { useState } from 'react'
import { Link } from 'react-router-dom'
import image from './assets/phlogo.png'
import { RegisterModal } from './RegisterModal'
import { LoginModal } from './LoginModal'
import { jwtDecode } from 'jwt-decode';
import imageUser from './assets/default.png'

export const NavigationBar = () => {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const token = localStorage.getItem('token')
  const decoded = token ? jwtDecode(token) : null;
  const url = decoded ? `/dashboard` : '/';

  return (
    <header className='w-full sticky'>
      <nav className='flex items-center justify-between shadow sm:h-18 md:h-24 pr-2 py-1 pl-2 lg:px-5'>
        <article className='flex items-center mr-6'>
          <Link to={url} className='block lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70'>
            <div className=' max-w-xs'>
              <img src={image} alt='Logo de la empresa' className=' w-auto cursor-pointer' />
            </div>
          </Link>
        </article>
        <article className='flex items-center flex-shrink-0'>
          {!token && (
            <>
              <Link to='/' className='no-underline text-sm md:text-base lg:text-lg text-black font-semibold md:ml-5' onClick={() => setShowLogin(true)}>Iniciar sesión</Link>
              <Link to='/' className='no-underline text-sm md:text-base lg:text-lg text-black font-semibold ml-2 md:ml-5' onClick={() => setShowRegister(true)}>Registrarse</Link>
            </>
          )}
        </article>
        {token && (
          <article className='flex items-center mr-6'>
            <img src={imageUser} alt='Imagen de usuario' className='w-10 h-10 rounded-full' />
          </article>
        )}
        <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
        <RegisterModal show={showRegister} onHide={() => setShowRegister(false)} />
      </nav>
    </header >
  )
}
