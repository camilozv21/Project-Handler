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
      <nav className='flex items-center shadow h-24 px-5'>
        <article className='flex items-center mr-6'>
          <Link to='/' className='block lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70'>
            <div className='max-w-sm'>
              <img src={image} alt='Logo de la empresa' className='w-full cursor-pointer' />
            </div>
          </Link>
        </article>
        <article className='flex items-center flex-shrink-0'>
          {/* <Link to='/' className='block no-underline lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70 font-semibold'>Inicio</Link> */}
          <Link to='/' className='block no-underline lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70 font-semibold ml-6' onClick={() => setShowLogin(true)}>Iniciar sesión</Link>
          <Link to='/' className='block no-underline lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70 font-semibold ml-6' onClick={() => setShowRegister(true)}>Registrarse</Link>
        </article>
        <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
        <RegisterModal show={showRegister} onHide={() => setShowRegister(false)} />
      </nav>
    </header>
  )
}
