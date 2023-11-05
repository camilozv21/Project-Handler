import { useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../assets/phlogo.png'
import { RegisterModal } from './RegisterModal'
import { LoginModal } from './LoginModal'

export const NavigationBar = () => {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  return (
    <header className='w-full sticky'>
      <nav className='flex items-center shadow sm:h-18 md:h-24 pr-2 py-1 pl-2 lg:pl-5'>
        <article className='flex items-center mr-6'>
          <Link to='/' className='block lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70'>
            <div className='max-w-sm'>
              <img src={image} alt='Logo de la empresa' className='w-full cursor-pointer'/>
            </div>
          </Link>
        </article>
        <article className='flex items-center flex-shrink-0'>
          <Link to='/' className='no-underline text-sm md:text-base lg:text-lg text-black font-semibold md:ml-5' onClick={() => setShowLogin(true)}>Iniciar sesión</Link>
          <Link to='/' className='no-underline text-sm md:text-base lg:text-lg text-black font-semibold ml-2 md:ml-5' onClick={() => setShowRegister(true)}>Registrarse</Link>
        </article>
        <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
        <RegisterModal show={showRegister} onHide={() => setShowRegister(false)} />
      </nav>
    </header>
  )
}
