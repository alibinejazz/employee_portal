
import React, { useState,  useRef, useEffect } from "react"
import {  Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";
import Config from "./Config";
function EmployeesList(props) {
    const queryRef = useRef("");
    const dataRef = useRef([]);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const tokenStr = localStorage.getItem("token");
    var name = "";
    var email = "";
    if(tokenStr){
      var userData = JSON.parse(tokenStr);
      name = userData.fullName;
      email = userData.email;
    }

    useEffect(() => {
        console.log('Bearer '+userData.accessToken)
        const url = new Config().baseUrl+"employee/all";
        fetch(url, {
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ userData.accessToken,
                "Accept": "*/*",
                'Access-Control-Allow-Origin' : "*"
            },
        })
            .then(response => response.json())
            .then( json => {
                console.log(JSON.stringify(json))
                if(json.hasOwnProperty("status")){
                  localStorage.removeItem("token");
                  navigate("/")

                }else{
                setData(json)
                console.log(JSON.stringify(json))
                dataRef.current = json;
              }
            })
            .catch( error => {
              console.error(error)
              localStorage.removeItem("token");
              navigate("/")
            })
   
    }, []);

   
  

    const searchEmployee = (event) => {
      event.preventDefault();
      var searchStr = queryRef.current?.value.toLowerCase();

      if(searchStr == ""){
          setData( dataRef.current);
      }else{
          setData(dataRef.current.filter((emp)=>{
            return emp.title.toLowerCase().includes(searchStr) || 
            emp.name.toLowerCase().includes(searchStr) || 
            emp.contactNumber.toLowerCase().includes(searchStr) || 
            emp.email.toLowerCase().includes(searchStr)
          }))
      }
       
      }


    
    return (
        
      <>
        <Container className="mt-5">
        <Row>
          <Col sm={4}>
            <Form className="d-flex">
              <Form.Control
                type="serach"
                placeholder="Search by Name, Email or IP Phone"
                className="me-3"
                aria-label="Search"
                ref={queryRef}
                onChange={searchEmployee}
              />
          
            </Form>
          </Col>
        </Row>
      
        <Row lg={3}>
        {
            data.map((emp)=>{
                    return (
                     
                    <Col className="col-6">
                    <EmployeeCard name = {emp.name} title = {emp.title} email = {emp.email} contact={emp.contactNumber} empData={btoa(JSON.stringify(emp))}/>
                    </Col>
                    
                    )
            })
        }
        </Row>
        </Container>
      </>
    )
      }

export default EmployeesList;