import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT_MUTATION } from "../graphql/projectMutations";
import { removeToken } from "../utils/token";

export const CreateProjectModal = (props) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [addProjectMutation, { loading, error, data }] =
    useMutation(ADD_PROJECT_MUTATION);

  const handleFileUpload = (e) => {
    setImg(e.target.files[0]);
  };

  const handleClose = () => {
    setImg(null);
    setName("");
    props.onHide();
  };

  const handleAddProject = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append(
        "query",
        `
        mutation {
          addProject(
            name: "${name}",
            image: ""
          ) {
            message
            statusCode
          }
        }
      `
      );
      formData.append("image", img);

      const response = await fetch(
        "https://project-handler-jvl7.vercel.app/graphql",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      let result = await response.json();

      if (!result.data || result.errors) {
        if (result.errors.length > 0) {
          alert(result.errors[0].message);
        } else {
          alert("Ha ocurrido un error en el servidor.");
        }
      } else {
        if (result.data.addProject.statusCode === 200) {
          handleClose();
        } else if (result.data.addProject.statusCode === 401) {
          removeToken();
          window.location.reload();
        } else {
          alert(result.data.addProject.message);
        }
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
            Nuevo proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleAddProject}
          >
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileUpload}
              multiple={false}
              accept="image/*"
            />
            <label
              htmlFor="file"
              className="flex items-center justify-center relative h-24 w-24 bg-blue-500 rounded-full p-2 cursor-pointer"
            >
              <span className="absolute z-20 font-semibold text-center text-white inset-0 rounded-full flex items-center justify-center bg-blue-700">
                Subir
                <br />
                Imagen
              </span>
            </label>
            <input
              type="text"
              placeholder="Nombre Proyecto"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? (
                <div
                  className="spinner-border text-light"
                  role="status"
                ></div>
              ) : (
                "Crear"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
