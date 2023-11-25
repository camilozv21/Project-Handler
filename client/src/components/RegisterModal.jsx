import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import imgDefault from "./assets/default123.png";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../graphql/userMutations";

export const RegisterModal = (props) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(null);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleClose = () => {
    setImg(null);
    setEmail("");
    setLastName("");
    setName("");
    setPassword1("");
    setPassword2("");
    props.onHide();
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (password1 !== password2) {
        setErrorPassword("Las contraseñas no coinciden");
        return;
      } else {
        setErrorPassword("");
      }
      const formData = new FormData();
      formData.append(
        "query",
        `
        mutation {
          addUser(
            name: "${name}",
            lastname: "${lastName}",
            email: "${email}",
            password: "${password1}",
            image: ""
          ) {
            message
            statusCode
          }
        }
      `
      );
      formData.append("image", img);

      const response = await fetch("https://project-handler-jvl7.vercel.app/graphql", {
        method: "POST",
        body: formData,
      });
      let result = await response.json();

      if (result.data) {
        handleClose();
      }
    } catch (error) {
      console.error("Error en la mutación:", error.message);
    }
  };

  return (
    <>
      <Modal {...props} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Registrarse
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleRegister}
          >
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleImageChange}
              multiple={false}
              accept="image/*"
            />
            <label
              htmlFor="file"
              className="flex items-center justify-center relative h-24 w-24 bg-blue-500 rounded-full p-2 cursor-pointer"
            >
              <img
                src={img ? URL.createObjectURL(img) : 'https://res.cloudinary.com/dj5kafiwa/image/upload/v1700750978/assets/default.png'}
                alt="usuario default"
              />
              <span className="absolute z-20 font-semibold text-center text-white inset-0 rounded-full flex items-center justify-center bg-blue-700 opacity-5 hover:opacity-100 transition-opacity ">
                Subir
                <br />
                Imagen
              </span>
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellidos"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorPassword && (
              <p className="text-red-500 mb-0 ">
                ¡Las contraseñas no coinciden!
              </p>
            )}
            <input
              type="password"
              placeholder="Contraseña"
              className={`border-2 border-gray-400 rounded-md p-2 m-2 w-80 ${errorPassword ? "border-red-500" : ""
                }`}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className={`border-2 border-gray-400 rounded-md p-2 m-2 w-80 ${errorPassword ? "border-red-500" : ""
                }`}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Registrarse
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
