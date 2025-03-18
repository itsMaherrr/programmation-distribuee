import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { Button as BsButton, Form } from 'react-bootstrap';
import { Button as MuiButton } from '@mui/material';


function Login() {

    const login = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const user = {
            'email': email,
            'password': password
        };
        const headers = {
            'Content-Type': 'application/json',
        };

        await axios.post(`http://localhost:8081/auth/login`, user, { headers: headers })
            .then((response) => {
                console.log(response.data.success);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.success === true) {
                        const userData = {
                            'userId': data.userId,
                            'fullName': data.fullName
                        };
                        localStorage.setItem("session", JSON.stringify(userData));
                        window.location.href = "/";
                        //setRedirect(true);
                    }
                    else {
                        alert(data.message);
                    }
                }
                else {
                    alert('connection failed or something idk');
                }
                //localStorage.setItem('jwtToken', token);

            });
    }


    return (
        <div className="login">
            <MDBContainer className="my-5 gradient-form">

                <MDBRow>

                    <MDBCol col='6' className="mb-6">
                        <div className="d-flex flex-column ms-5">
                            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085', padding:'50px' }}/>
                            <div className="text-center">
                                <h4 className="mt-1 mb-5 pb-1">Books Library</h4>
                            </div>
                            <Form onSubmit={login}>
                                <Form.Group>

                                    <label className='login-label'> E-mail </label>
                                    <MDBInput className='login-input' wrapperClass='mb-4' id='email' type='email' required='required' />
                                    <label className='login-label'> Password </label>
                                    <MDBInput className='login-input' wrapperClass='mb-4' id='password' type='password' required='required' />

                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <BsButton id='login-btn' variant="secondary" type='submit' size='lg' >Login</BsButton><br />
                                        <a className="text-muted" href="#!">Forgot password?</a>
                                    </div>

                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                        <p className="mb-0">Don't have an account?</p>
                                        <MuiButton id='register-btn' variant="outlined" color="error" as={Link} to="/register">
                                            Register
                                        </MuiButton>
                                    </div>
                                </Form.Group>
                            </Form>

                        </div>

                    </MDBCol>

                    <MDBCol col='6' className="mb-6">
                        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 className="mb-4">We are more than just a library</h4>
                                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>

                        </div>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </div>
    );
}

export default Login;