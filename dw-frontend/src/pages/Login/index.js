import React, { useState, useEffect, useRef } from 'react';
import { Container, LoginContainer, LoadingAnimationContainer, IconContainer } from "./styles";
import api from '../../services/api';
import { FaSun } from 'react-icons/fa'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3000/dataWarehouse";
const LOGIN_URL = "/users/login";

function Login() {
  // Declaration of States:
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  // Declaration of References:
  const refInputEmail = useRef();
  const refInputPassword = useRef();

  // Declaration of Request Options:
  const loginRequestHeaders = {
    "Content-Type": "application/json"
  };
  const loginRequestData = JSON.stringify({
    "email": emailValue,
    "user_password": passwordValue
  });
  const loginRequestInfo = {
    method: 'POST',
    headers: loginRequestHeaders,
    body: loginRequestData,
    redirect: 'follow'
  }

  /**
    * @method triggerLogin
    * @description POST User's info for login.
    * @argument {string} URL
    * @argument {object} requestInfo
    * @returns {promise}
 */
  const triggerLogin = () => {
    const loginResponse = api(`${BASE_URL}${LOGIN_URL}`, loginRequestInfo);
      loginResponse.then(response => {
        localStorage.setItem("Token", response.Token)
        localStorage.setItem("IsAdmin", response.IsAdmin)
      })
  }
  

  return (
    <Container>
      <LoginContainer>
        <h2>Welcome!</h2>
        <h5>Please provide your email and password.</h5>
        <h6>If you don't have a user, please contact the Administrator.</h6>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          name="email"
          type="email"
          ref={refInputEmail}
          onChange={()=>{
            setEmailValue(refInputEmail.current.value)
          }} 
          />
        <label htmlFor="password">Password</label >
        <input 
          id="password" 
          name="password"
          type="password"
          ref={refInputPassword}
          onChange={()=> {
            setPasswordValue(refInputPassword.current.value)
          }}
        />
        <button onClick={triggerLogin}>Login</button >
      </LoginContainer>
      <LoadingAnimationContainer>
        <h4>Redirecting...</h4>
        <IconContainer>
          <FaSun size={20} color="#fcec5d"/>
        </IconContainer>
      </LoadingAnimationContainer>
    </Container>
  )
}

export default Login;
