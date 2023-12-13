import React from 'react';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import { NavLink, Link, useParams, useNavigate, json} from 'react-router-dom';

import styles from './NavBar.module.css';
import logo from './alfa_logo.webp'

const NavBar = () => {

    const navigate = useNavigate();
     
      
      const tokenStr = localStorage.getItem("token");
      var name = "";
      var email = "";
      if(tokenStr){
        var userData = JSON.parse(tokenStr);
        name = userData.fullName;
        email = userData.email;
      }

    
    
      function logout(){
        localStorage.removeItem("token");
        navigate("/")
      }
  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container className={styles.navbarContainer}>
        <Navbar.Brand as={NavLink} to="/">
            <div>
            <Image src= {logo} width="40px" height="40px"/>
           
            <span className='brandname'>Employee Portal</span>
            </div>

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {
                tokenStr ? 
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={styles.navLink}>
              Home
            </Nav.Link>
              <Nav.Link as={NavLink} to="/employeeslist" className={styles.navLink}>
                Employee Search
              </Nav.Link>
               <Button className="btn btn-danger btn-sm" onClick={logout}>
               Logout
             </Button>
        
          </Nav> :

            <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={styles.navLink}>
            Home
            </Nav.Link>
            </Nav> 
            } 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;