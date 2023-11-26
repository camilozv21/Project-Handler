import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK_MUTATION } from '../graphql/taskMutations';


export const TaskCard = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleEditTask = async (e) => {
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
        window.location.reload();
      }
    } catch (error) {
      console.error("Error en la mutación:", error.message);
    }
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
          <form onSubmit={handleEditTask}></form>
        </Modal.Body>
      </Modal>
    </>
  )
}