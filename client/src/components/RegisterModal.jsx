import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'
import imgDefault from './assets/default.png'

export const RegisterModal = (props) => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  

  return (
    <>
      <Modal
        {...props}
        size='md'
        >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Registrarse
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='flex flex-col items-center justify-center'>
            <input type="file" id='file' className='hidden' />
            <label htmlFor="file" className='flex items-center justify-center relative h-24 w-24 bg-blue-500 rounded-full p-2 cursor-pointer'>
              <img src={imgDefault} alt="usuario default" />
              <span className='absolute z-20 text-center text-white inset-0 rounded-full flex items-center justify-center bg-indigo-500 opacity-5 hover:opacity-100 transition-opacity '>Subir<br/>Imagen</span>
            </label>
            <input type='text' placeholder='Nombre' className='border-2 border-gray-400 rounded-md p-2 m-2 w-80' />
            <input type='text' placeholder='Apellidos' className='border-2 border-gray-400 rounded-md p-2 m-2 w-80' />
            <input type='email' placeholder='Correo electrónico' className='border-2 border-gray-400 rounded-md p-2 m-2 w-80' />
            <input type='password' placeholder='Contraseña' className='border-2 border-gray-400 rounded-md p-2 m-2 w-80' />
            <input type='password' placeholder='Confirmar contraseña' className='border-2 border-gray-400 rounded-md p-2 m-2 w-80' />
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Registrarse</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
