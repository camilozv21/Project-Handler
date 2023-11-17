import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { LOGIN_MUTATION } from "../graphql/userMutations";
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";

export const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { loading, error, data }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const result = await loginMutation({
        variables: {
          email: email,
          password: password,
        },
      });
      console.log(result.data.login);
      if (!result.error && result.data.login.statusCode === 200) {
        localStorage.setItem('token', result.data.login.token);
        localStorage.setItem('exp', result.data.login.expiresIn);
        navigate(`/dashboard`); // Retirar el id del usuario
      }
      else {
        if (result.errors && result.errors.length > 0) {
          alert(result.errors[0].message);
        }
        else {
          alert(result.data.login.message);
        }
      }
      if (result.data) {
        props.onHide();
      }

    } catch (error) {
      console.error('Error en la mutación:', error.message);
    }
  };

  return (
    <>
      <Modal {...props} size="md">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Iniciar sesión
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Iniciar sesión
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
