import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaSun } from 'react-icons/fa'

import { Container, LoginContainer, LoadingAnimationContainer, IconContainer } from "./styles";
import api from '../../services/api';
import UserAuthContext from '../../context/auth';

import './styles.css'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3000/dataWarehouse";
const LOGIN_URL = "/users/login";

function Login() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  // Declaration of States:
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [renderLoginOverlay, setRenderLoginOverlay] = useState(false)
  const [fetchStatus, setFetchStatus] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
    setRenderLoginOverlay(true)
    setTimeout(() => {
      setFetchStatus(true)
    }, 0);
    setTimeout(()=>{
    const loginResponse = api(`${BASE_URL}${LOGIN_URL}`, loginRequestInfo);
      loginResponse.then(response => {
        if(response.Status === 200) {
          setAuthState({
            isLoggedIn: true,
            token: response.Token,
            isAdmin: response.IsAdmin,
          })
        }
      })
    }, 1000)
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
      {
        renderLoginOverlay 
        ? 
        <LoadingAnimationContainer className={fetchStatus ? "log_appear" : "log_dissappear"}>
          
          {loginError 
            ? 
            <h4>Error</h4> 
            : 
            <>
              <h4>Redirecting...</h4>
              <IconContainer>
                <FaSun size={36} color="#fcec5d"/>
              </IconContainer>
            </>  
          }
        </LoadingAnimationContainer> 
        : 
        <></>
      }
    </Container>
  )
}

export default Login;
