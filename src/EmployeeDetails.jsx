import Card from 'react-bootstrap/Card';

import React, { useState,  useRef } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";

function EmployeeDetails(props) {

    let { id } = useParams();
    var emp = JSON.parse(atob(id));

    return (
        <>
       <br/>
        <Card
        key={emp.contact}
        
        className="flex-fill"
        >
        <Card.Header>{emp.name}</Card.Header>
        <Card.Body>
        <Card.Title>{emp.title}</Card.Title>
        <Card.Text>
           Employee ID:<b>{emp.employeeId}</b>
        </Card.Text>
        <Card.Text>
            Email: <b>{emp.email}</b>
        </Card.Text>
        <Card.Text>
           IP:<b>{emp.contactNumber}</b>
        </Card.Text>
        <Card.Text>
           Reports To:<b>{emp.reportsTo}</b>
        </Card.Text>
        <Card.Text>
           Unit:<b>{emp.unit}</b>
        </Card.Text>
        <Card.Text>
          Department:<b>{emp.department}</b>
        </Card.Text>
        <Card.Text>
           Location:<b>{emp.location}</b>
        </Card.Text>
        </Card.Body>
        </Card>
        </>
    )
}

export default EmployeeDetails;