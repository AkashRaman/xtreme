import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {HOST} from "../config";
import { Spinner } from 'react-bootstrap';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";

import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
  } from "reactstrap";

export default function Add() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    const navigate = useNavigate();
    const [submitClicked,setSubmitClicked] = useState(false);
    const [title,setTitle] = useState("");
    const [subtitle,setSubtitle] = useState("");
    const [description,setDescription] = useState("");
    const [errorMsg,setErrorMsg] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        const content = {
            title: title,
            subtitle: subtitle,
            description: description
        };

        user.contents.unshift(content);

        setSubmitClicked(true)

        try {
            console.log(user);
            const { data } = await axios.post(`${HOST}/user/add/${user._id}`,{content},{
              headers: {
                "content-type": "application/json",
              },
            });
            console.log("submitting...", data);
      
            localStorage.setItem('user',JSON.stringify(data));

            setErrorMsg('');
            
            navigate('/notes');
          } catch (error) {
            console.log(error);
            setSubmitClicked(false)
            if(error.code === "ERR_BAD_RESPONSE") setErrorMsg(`${error.response.data.error}`);
          }
    }

  return (
    // <section className="vh-100" style={{ backgroundColor: "#d94125" }}>
    //   <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
    //     <MDBRow className="justify-content-center">
    //       <MDBCol md="10" lg="8" xl="6">
    //         <MDBCard>
    //           <MDBCardBody className="p-4">
    //             <div className="d-flex flex-start w-100">
    //               <MDBCardImage
    //                 className="rounded-circle shadow-1-strong me-3"
    //                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
    //                 alt="avatar"
    //                 width="65"
    //                 height="65"
    //               />

    //               <div className="w-100">
    //                 <MDBTypography tag="h5">Add a comment</MDBTypography>
    //                 <div>
    //                   <a href="">
    //                     <MDBIcon far icon="star text-danger me-1" />
    //                     <MDBIcon far icon="star text-danger me-1" />
    //                     <MDBIcon far icon="star text-danger me-1" />
    //                     <MDBIcon far icon="star text-danger me-1" />
    //                     <MDBIcon far icon="star text-danger me-1" />
    //                   </a>
    //                 </div>
    //                 <MDBTextArea label="What is your view?" rows={4} />

    //                 <div className="d-flex justify-content-between mt-3">
    //                   <MDBBtn color="success">Danger</MDBBtn>
    //                   <MDBBtn color="danger">
    //                     Send <MDBIcon fas icon="long-arrow-alt-right ms-1" />
    //                   </MDBBtn>
    //                 </div>
    //               </div>
    //             </div>
    //           </MDBCardBody>
    //         </MDBCard>
    //       </MDBCol>
    //     </MDBRow>
    //   </MDBContainer>
    // </section>
    <Row  className="m-4">
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Add Notes
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  name="title"
                  placeholder="Add Title"
                  type="textarea"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subtitle">Sub-title</Label>
                <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
                    id="subtitle"
                    name="subtitle"
                    placeholder="Add Sub-Title"
                    type="textarea"
                    />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input id="exampleText" value={description} onChange={(e) => setDescription(e.target.value)} name="text" type="textarea" />
              </FormGroup>
              <div className="d-flex justify-content-between mb-4" style={{ lineHeight: "1.25rem" }}>
                <p style={{color: 'red'}}>{errorMsg}</p>
              </div>
              {!submitClicked ? <Button onClick={(e) => submit(e)} color="primary">Submit</Button> : <Spinner animation="border" variant="primary" />}
              
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}