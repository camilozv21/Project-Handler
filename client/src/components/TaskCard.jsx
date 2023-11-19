import Card from 'react-bootstrap/Card';

export const TaskCard = (props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.status}</Card.Text>
        <Card.Text>{props.deadeline}</Card.Text>
      </Card.Body>
    </Card>
  )
}
