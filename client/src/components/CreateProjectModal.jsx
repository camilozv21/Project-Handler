import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT_MUTATION } from "../graphql/projectMutations";

export const CreateProjectModal = (props) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [addProjectMutation, { loading, error, data }] = useMutation(ADD_PROJECT_MUTATION);

  const handleFileUpload = (e) => {
    console.log(e.target.files[0])
    setImg(e.target.files[0]);
  }

  const handleAddProject = async (e) => {
    try {
      e.preventDefault();
      const result = await addProjectMutation({
        variables: {
          name: name,
          image: img,
        },
      });
      console.log(result.data);
      if (result.data) {
        props.onHide();
      }
    } catch (error) {
      console.error("Error en la mutación:", error.message);
    }
  }
  return (
    <>
      <Modal {...props} size="md">
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
            />
            <label
              htmlFor="file"
              className="flex items-center justify-center relative h-24 w-24 bg-blue-500 rounded-full p-2 cursor-pointer"
            >
              <span className="absolute z-20 font-semibold text-center text-white inset-0 rounded-full flex items-center justify-center bg-blue-700 opacity-5 hover:opacity-100 transition-opacity ">
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
              Crear
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
