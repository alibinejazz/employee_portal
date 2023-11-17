
import React, { useState } from "react"; 
import { Alert} from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
function AlertMessage(props) {

    return (
        <Alert variant={props.variant}>
            <span>{props.message}</span>
        </Alert>
    )
}

export default AlertMessage;