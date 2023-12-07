import Card from 'react-bootstrap/Card';

function EmployeeCard(props) {
    return (
        <>
       <br/>
        <Card
        key={props.contact}
        
        className="flex-fill"
        >
        <Card.Header>{props.name}</Card.Header>
        <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            Email: <b>{props.email}</b>
        </Card.Text>
        <Card.Text>
           IP:<b>{props.contact}</b>
        </Card.Text>
        </Card.Body>
        </Card>
        </>
    )
}

export default EmployeeCard;