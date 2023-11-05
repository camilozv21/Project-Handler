import Modal from 'react-bootstrap/Modal';

export const RegisterModal = (props) => {
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
