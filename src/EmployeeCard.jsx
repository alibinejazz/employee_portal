import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";

function EmployeeCard(props) {
    
    const navigate = useNavigate();

    function gotoDetails(){
        navigate(`/employee/${props.empData}`,{id:props.empData});
    }

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

        <Card.Footer>
            <Button onClick={gotoDetails}>
                Show Details
            </Button>

        </Card.Footer>

        </Card.Body>
        </Card>
        </>
    )
}

export default EmployeeCard;