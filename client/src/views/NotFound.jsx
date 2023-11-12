import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <FaExclamationTriangle className='text-danger' size='5em' />
      <h1>404</h1>
      <p className="lead px-3 text-justify">Lo sentimos 😥, esta página aún no existe</p>
      <p className="lead px-3 text-justify">¡Te invitamos a que sigas navegando y descubiendo nuestros servicios y productos en el siguiente botón!</p>
      <Link to='/' className='btn btn-primary'>
        Página principal
      </Link>
    </div>
  )
}
