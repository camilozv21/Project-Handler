import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useMutation } from "@apollo/client";
import { ADD_TASK_MUTATION } from "../graphql/taskMutations";

export const TaskFormModal = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadeLine, setDeadline] = useState('');
  const [addTaskMutation, { loading, error, data }] = useMutation(ADD_TASK_MUTATION);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddTask = async (e) => {
    try {
      e.preventDefault();
      const result = await addTaskMutation({
        variables: {
          projectId: props.projectId,
          name: name,
          description: description,
          deadLine: deadeLine,
          status: status,
        },
      });

      if (result.data) {
        handleClose();
      }
    } catch (error) {
      console.error("Error en la mutación:", error.message);
    }
  }

  return (
    <>
      <button className="w-28 h-28 sm:w-48 md:w-52 bg-zinc-400 rounded text-4xl font-bold hover:bg-zinc-500 transition-colors" onClick={handleShow}>+</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleAddTask}
          >
            <input
              type="text"
              placeholder="Nombre Proyecto"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Descripción Tarea"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="date"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={deadeLine}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Crear
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
