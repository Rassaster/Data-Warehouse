import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from "react-router-dom";
import api from '../../../services/api';
import UserAuthContext from '../../../context/auth';

import { Container, Head, FormContainer, InputLabelContainer } from "./styles";
import './styles.css'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const CREATE_USER = "/users/register";

function NewUser() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  // Declaration of States:
  const [nameValue, setNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [profileValue, setProfileValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [isAdminValue, setIsAdminValue] = useState(false)
  const [userCreated, setUserCreated] = useState()
  const [createOtherUserBtn, setCreateOtherUserBtn] = useState(false)
  console.log("IS adm", isAdminValue)
  // Declaration of References:
  const refInputName = useRef();
  const refInputLastName = useRef();
  const refInputEmail = useRef();
  const refInputProfile = useRef();
  const refInputIsAdmin = useRef();
  const refInputPassword = useRef();

  // Declaration of Request Options:
  const createNewUserRequestHeaders = {
    "Content-Type": "application/json"
  };
  const createNewUserRequestData = JSON.stringify({
    "name" : nameValue,
    "last_name" : lastNameValue,
    "email" : emailValue,
    "profile" : profileValue,
    "is_admin" : isAdminValue ? "T" : "F",
    "user_password" : passwordValue
  });
  const createNewUserRequestInfo = {
    method: 'POST',
    headers: createNewUserRequestHeaders,
    body: createNewUserRequestData,
    redirect: 'follow'
  }

  const cleanInputs = () => {
    refInputName.current.value = ""
    refInputLastName.current.value = ""
    refInputProfile.current.value = ""
    refInputEmail.current.value = ""
    refInputPassword.current.value = ""
    
    refInputIsAdmin.current.checked = false 
  }
  
  const triggerCreateOtherUser = () => {
    cleanInputs()
    setCreateOtherUserBtn(false)
    setUserCreated(null)
  }

  const triggerUserCreation = () => {
    const userCreationResponse = api(`${BASE_URL}${CREATE_USER}`, createNewUserRequestInfo);
    userCreationResponse.then(response => {
        console.log(response)
        if(response.Status === 201) {
          setUserCreated(true)
          setCreateOtherUserBtn(true)
        }
      })
    }
    

  return (
    <Container>
      <Link to="/users"> Back to Users menu </Link>
      <Head>
        <h1>USERS</h1>
        <h2>Register a New User</h2>
      </Head>
      <FormContainer>
        <InputLabelContainer>
          <label htmlFor="name">Name</label>
          <input 
            id="name" 
            name="name"
            type="text"
            ref={refInputName}
            onChange={()=>{
              setNameValue(refInputName.current.value)
            }} 
          />
        </InputLabelContainer>
        <InputLabelContainer>
          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            name="lastName"
            type="text"
            ref={refInputLastName}
            onChange={()=>{
              setLastNameValue(refInputLastName.current.value)
            }} 
          />
        </InputLabelContainer>
        <InputLabelContainer>
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
        </InputLabelContainer>

        <InputLabelContainer>
          <label htmlFor="profile">Profile</label>
          <input 
            id="profile" 
            name="profile"
            type="text"
            ref={refInputProfile}
            onChange={()=>{
              setProfileValue(refInputProfile.current.value)
            }} 
          />
        </InputLabelContainer>
        <InputLabelContainer>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password"
            type="password"
            ref={refInputPassword}
            onChange={()=>{
              setPasswordValue(refInputPassword.current.value)
            }} 
            />
        </InputLabelContainer>
        <InputLabelContainer className="isAdminInput">
          <label htmlFor="isAdmin">Is Admin</label>
          <input 
            id="isAdmin" 
            name="isAdmin"
            type="checkbox"
            ref={refInputIsAdmin}
            onChange={()=>{
              setIsAdminValue(refInputIsAdmin.current.checked)
            }} 
          />
        </InputLabelContainer>
        <InputLabelContainer>
          {
            createOtherUserBtn ? 
            <>
              <button  onClick={triggerCreateOtherUser}> Create other </button >
              <Link to="/users" className="linkBtn"> Back to Users </Link >
            </>
            : 
            <button onClick={triggerUserCreation}> Create User </button >
          }
          {userCreated ? <div>User Created Successfuly.</div > : <div></div>}
        </InputLabelContainer>
      </FormContainer>
    </Container>

  )
}

export default NewUser;
