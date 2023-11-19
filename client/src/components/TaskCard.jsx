import Card from 'react-bootstrap/Card';

export const TaskCard = (props) => {
  const deadlineTimestamp = Number(props.deadLine);
  if (isNaN(deadlineTimestamp)) {
    console.error(`Invalid deadline: ${props.deadLine}`);
    return null;
  }

  const deadlineDate = new Date(deadlineTimestamp);
  const formattedDate = `${deadlineDate.getDate().toString().padStart(2, '0')}/${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}/${deadlineDate.getFullYear()}`;

  const statusColor = props.status === "Not Started" ? "red" : props.status === "In Progress" ? "yellow" : "green";

  return (
    <Card className='w-28 sm:w-48 md:w-52'>
      <Card.Body>
        <div style={{ position: 'relative' }}>
          <Card.Title>{props.name}</Card.Title>
          <span style={{ backgroundColor: statusColor, borderRadius: '50%', display: 'inline-block', width: '10px', height: '10px', position: 'absolute', top: '-5px', right: '-5px' }}></span>
        </div>
        <Card.Text>{formattedDate}</Card.Text>
      </Card.Body>
    </Card>
  )
}