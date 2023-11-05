import { Link } from 'react-router-dom'
import image from '../assets/phlogo.png'

export const NavigationBar = () => {
  return (
    <header className='w-full sticky'>
      <nav className='flex items-center shadow-lg h-16'>
        <article className='flex items-center mr-6'>
          <Link to='/' className='block lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70'>
            <img src={image} alt='Logo de la empresa' className='w-52 cursor-pointer' />
          </Link>
        </article>
        <article className='flex items-center flex-shrink-0'>
          <Link to='/' className='block lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70'>Inicio</Link>
        </article>
      </nav>
    </header>
  )
}
