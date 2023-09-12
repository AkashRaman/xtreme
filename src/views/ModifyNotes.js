import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {HOST} from "../config";
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

export default function Modify() {
    let user = JSON.parse(localStorage.getItem('user'));

    let index = localStorage.getItem("index");
    index = index !== 'null' ? JSON.parse(index) : 0;
    const content = user.contents[index];

    const navigate = useNavigate();

    const [title,setTitle] = useState(content.title);
    const [subtitle,setSubtitle] = useState(content.subtitle);
    const [description,setDescription] = useState(content.description);

    const submit = async (e) => {
        e.preventDefault();

        const newContent = {
            title: title,
            subtitle: subtitle,
            description: description
        };

        try {
            console.log(user);
            const { data } = await axios.post(`${HOST}/user/modify/${user._id}/${index}`,{newContent},{
              headers: {
                "content-type": "application/json",
              },
            });
            console.log("submitting...", data);
      
            localStorage.setItem('user',JSON.stringify(data));
            
            navigate('/notes');
          } catch (error) {
            console.log(error);
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
            Modify Your Note
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
              <Button onClick={(e) => submit(e)}>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}