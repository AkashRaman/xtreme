import React, { useState, useEffect } from 'react';
import '../Scss/register.scss';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {HOST} from "../config";
import { Spinner } from 'react-bootstrap';
import { Button,Label } from "reactstrap";

function Register() {
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [remember, setRemember] = useState(false);
  const [fetching,setFetching] = useState(false);
  
  useEffect(() => {

  }, [email,password,errorMsg]);

  const createUser = async (e) => {
    e.preventDefault();
    setFetching(true)

    setErrorMsg("");
    
    const user = {
      first_name: fname,
      last_name: lname,
      email: email,
      password: password
    };

    try {
      console.log(user);
      const { data } = await axios.post(`${HOST}/user/register`,user,{
        headers: {
          "content-type": "application/json",
        },
      });
      console.log("submitting...", data);

      localStorage.setItem('user',JSON.stringify(data));
      localStorage.setItem('token',JSON.stringify(data._id));
      
      setErrorMsg("");
      
      setTimeout(()=> {
        navigate('/');
      },500);
      
    } catch (error) {
      setFetching(false)
      console.log(error);
      if(error.code === "ERR_BAD_RESPONSE") setErrorMsg(error.response.data.error);
    }
    
    // await fetch("http://localhost:3000", u).then(()=> {
    //   console.log("working");
    // })
    // .catch(error => {
    //   console.log(error.msg);
    // });
  }

  

  return(
    <MDBContainer fluid className="p-3 my-5">
      
      <MDBRow>
        <MDBCol col='10' md='6' className="signin__image mx-auto my-4">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6' className="signin__typebox m-auto">

            <div className="divider d-flex align-items-center mb-5">
                <h2 className="text-center fw-bold mx-3 mb-0">Register</h2>
            </div>
          <Label for="formControlLg">First Name</Label>
          <MDBInput value={fname} onChange={(e) => setFname(e.target.value)} className="" wrapperClass='mb-4' id='formControlLg' type='email' size="lg"/>
          <Label for="Last Name">Last Name</Label>
          <MDBInput value={lname} onChange={(e) => setLname(e.target.value)} className="" wrapperClass='mb-4' id='formControlLg' type='email' size="lg"/>
          <Label for="formControlLg">Email address</Label>
          <MDBInput value={email} onChange={(e) => setEmail(e.target.value)} className="" wrapperClass='mb-4' id='formControlLg' type='email' size="lg"/>
          <Label for="formControlLg">Password</Label>
          <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} className="" wrapperClass='mb-4' id='formControlLg' type='password' size="lg"/>


          <div className="d-flex justify-content-between mx-2 mb-4" style={{ lineHeight: "1.25rem" }}>
            {/* <MDBCheckbox onClick={(e)=> setRemember(e.target.checked)} name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
            <p style={{color: 'red'}}>{errorMsg}</p>
          </div>

          {!fetching ? <Button onClick={(e)=> createUser(e)} className="mb-4 w-100" color="primary" size="lg">Register</Button> : <Spinner animation="border" variant="primary" />}

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <Button onClick={(e) => navigate('/#/user/login')} className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
            Log in
          </Button>

          {/* <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
            <MDBIcon fab icon="facebook-f" className="mx-2"/>
            Continue with facebook
          </MDBBtn>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
            <MDBIcon fab icon="twitter" className="mx-2"/>
            Continue with twitter
          </MDBBtn> */}

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Register;