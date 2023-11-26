import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_TASK_MUTATION } from '../graphql/taskMutations';
import { DELETE_TASK_MUTATION } from '../graphql/taskMutations';

export const TaskCard = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [deadeLine, setDeadline] = useState(props.deadLine);
  const [status, setStatus] = useState(props.status);
  const [editTaskMutation, { loading, error, data }] = useMutation(EDIT_TASK_MUTATION);
  const [deleteTaskMutation] = useMutation(DELETE_TASK_MUTATION);

  const handleClose = () => setShow(false);

  const handleDeleteTask = (e) => {
    e.preventDefault();
    deleteTaskMutation({
      variables: {
        id: props.id
      }
    });
    alert("Tarea eliminada");
    window.location.reload();
    setShow(false);
  }

  const handleEditTask = (e) => {
    e.preventDefault();
    editTaskMutation({
      variables: {
        id: props.id,
        name: name,
        description: description,
        deadLine: deadeLine,
        status: status
      }
    });
    setShow(false);
  }

  const deadlineTimestamp = Number(props.deadLine);
  if (isNaN(deadlineTimestamp)) {
    console.error(`Invalid deadline: ${props.deadLine}`);
    return null;
  }

  const deadlineDate = new Date(deadlineTimestamp);
  const formattedDate = `${deadlineDate.getDate().toString().padStart(2, '0')}/${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}/${deadlineDate.getFullYear()}`;

  const statusColor = props.status === "Not Started" ? "red" : props.status === "In Progress" ? "yellow" : "green";

  return (
    <>
      <Card className='w-28 sm:w-48 md:w-52 cursor-pointer' onClick={() => setShow(true)}>
        <Card.Body>
          <div style={{ position: 'relative' }}>
            <Card.Title>{props.name}</Card.Title>
            <span style={{ backgroundColor: statusColor, borderRadius: '50%', display: 'inline-block', width: '10px', height: '10px', position: 'absolute', top: '-5px', right: '-5px' }}></span>
          </div>
          <Card.Text>{formattedDate}</Card.Text>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
          <span style={{ backgroundColor: statusColor, borderRadius: '50%', display: 'inline-block', width: '10px', height: '10px', marginLeft: '1rem' }}></span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleEditTask}>
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
              placeholder="Fecha Límite"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={deadeLine}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <select
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Not Started">No iniciada</option>
              <option value="In Progress">En progreso</option>
              <option value="Completed">Finalizada</option>
            </select>
            <div className='flex justify-center items-center gap-4'>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {loading ? (
                  <div
                    className="spinner-border text-light"
                    role="status"
                  ></div>
                ) : (
                  "Editar Tarea"
                )}
              </button>
              <button
                onClick={handleDeleteTask}
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                {loading ? (
                  <div
                    className="spinner-border text-light"
                    role="status"
                  ></div>
                ) : (
                  "Eliminar Tarea"
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}