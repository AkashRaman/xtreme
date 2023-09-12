import { useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import '../Scss/Login.scss';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {HOST} from "../config";
import { Button } from "reactstrap";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // const [remember, setRemember] = useState(false);
  const [fetching,setFetching] = useState(false);

  const userLogin = async(e) => {
    e.preventDefault();
    
    const user = {
      email: email,
      password: password
    };

    setFetching(true)

    setErrorMsg("");

    try {
      console.log(user);

      const { data } = await axios.post(`${HOST}/user/login`,user,{
        headers: {
          "content-type": "application/json",
        },
      });
      console.log("submitting...", data);

      localStorage.setItem('user',JSON.stringify(data));
      localStorage.setItem('token',JSON.stringify(data._id));
      setErrorMsg("");
      setTimeout(()=> {
        navigate('/home');
      },1000);
    } catch (error) {
      console.log(error);
      if(error.code === "ERR_BAD_RESPONSE") setErrorMsg(error.response.data.error);
      setFetching(false)
    }

  }

  return (
    <MDBContainer fluid className="pt-3 mt-5 h-custom ">

      <MDBRow>

        <MDBCol col='10' md='6' className="login__image mx-auto my-4">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'  className="login__typebox m-auto">

          <div className="divider d-flex align-items-center my-4">
            <h2 className="text-center fw-bold mx-3 mb-0">Log In</h2>
          </div>

          <MDBInput value={email} onChange={(e) => setEmail(e.target.value)} wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4" style={{ lineHeight: "1.25rem" }}>
            {/* <MDBCheckbox onClick={(e)=> setRemember(e.target.checked)} name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
            <p style={{color: 'red'}}>{errorMsg}</p>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            {!fetching ? <Button onClick={(e) => userLogin(e)} className="mb-0 px-5" color="primary" size="lg">Login</Button> : <Spinner animation="border" variant="primary" />}
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/#/user/register"  className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;