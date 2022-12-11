import React, { useState, useEffect } from 'react';
import { Container, LoginContainer } from "./styles";
import api from '../../services/api';

function Login() {
  const BASE_URL = "http://localhost:3000/dataWarehouse";
  const LOGIN_URL = "/users/login";
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const loginRequestHeaders = {
    "Content-Type": "application/json"
  };
  const loginRequestData = JSON.stringify({
    "email": "anasophie@gmail.com",
    "user_password": "admin2#"
  });
  const loginRequestInfo = {
    method: 'POST',
    headers: loginRequestHeaders,
    body: loginRequestData,
    redirect: 'follow'
  }
  const triggerLogin = () => {
    const loginResponse = api(`${BASE_URL}${LOGIN_URL}`, loginRequestInfo);
      loginResponse.then(r => {
        console.log(r)
        localStorage.setItem("token", r.Token)
      })
  }
  useEffect(() => {
    // const loginResponse = api(`${BASE_URL}${LOGIN_URL}`, loginRequestInfo);
    //   loginResponse.then(r => {
    //     console.log(r)
    //     localStorage.setItem("token", r.Token)
    //   })
  }, []);

  return (
    <Container>
      <LoginContainer>
        <label htmlFor="email">Email:</label>
        <input value={emailValue} name="email" />
        <label htmlFor="password">Password:</label >
        <input value={passwordValue} name="password" />
        <button onClick={triggerLogin}>Login</button >
      </LoginContainer>
      
    </Container>
  )
}

export default Login;
