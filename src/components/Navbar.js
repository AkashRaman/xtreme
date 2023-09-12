import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router";

function NavBar() {
    
      const [data, setData] = useState({
        email: `akash`,
        password: ``,
        token: ``,
        content: ``
      });
    
      const submit = async (e) => {
        e.preventDefault();
    
        const person = {...data};
        
        console.log(person);
        try {
          const { data } = await axios.post("/",person,
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );
          console.log("submitting...", data)
        } catch (error) {
          console.log("error:", error)
        }

        // await fetch("http://localhost:3000",{
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: person
        // }).then(()=> {
        //   console.log("working");
        // })
        // .catch(error => {
        //   window.alert(error);
        //   return;
        // });
      }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Noted</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {/* onClick={(e)=>submit(e)} */}
            <Nav.Link href="#">User</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;