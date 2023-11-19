import image from './assets/homeImage.jpg'
import image2 from './assets/description.jpg'
import image3 from './assets/description_movile.png'
import image4 from './assets/homeImagemovile.png'

export const Welcome = () => {
  return (
    <>
      <h1 className="capitalize font-bold sm:text-xl md:text-3xl m-6 text-center">¡Organiza tus proyectos y tareas online!</h1>

      <div className="flex flex-col items-center justify-center">
        <img src={image} alt="Welcome" className="hidden md:block w-4/4 md:w-3/4" />
        <img src={image4} alt="Welcome" className="block md:hidden w-4/4 md:w-3/4" />
        <p className="sm:text-xl font-semibold md:text-2xl m-6">¡Inicia sesión ahora y empieza a gestionar tus proyectos favoritos!</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img src={image2} alt="Welcome" className="hidden md:block w-4/4 md:w-3/4" />
        <img src={image3} alt="Welcome" className="block md:hidden w-4/4 md:w-3/4" />
      </div>
    </>
  )
}