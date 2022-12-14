import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";
import api from '../../../services/api';
import UserAuthContext from '../../../context/auth';

import { FaTrashAlt, FaEdit, FaTimes} from 'react-icons/fa'
import { Container, Head, UsersTable, TableHeadRow, TableUserRow, OverlayUpdate, FormContainer, InputLabelContainer } from "./styles";
import './styles.css'

const loggedOff = {isLoggedIn: false, token: '', isAdmin: ''}

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const ALL_USERS = "/users/allRegistered";
const UPDATE_USER = "/users/updateUserId:";
const DELETE_USER = "/users/deleteUserId:";

function AllUsers() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);
  
  // Declaration of States:
  const [usersList, setUsersList] = useState([])
  const [editActive, setEditActive] = useState(false)

  const [nameValue, setNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [profileValue, setProfileValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [isAdminValue, setIsAdminValue] = useState(false)
  const [userIdToUpdate, setUserIdToUpdate] = useState()

  // Declaration of References:
  const refInputName = useRef();
  const refInputLastName = useRef();
  const refInputEmail = useRef();
  const refInputProfile = useRef();
  const refInputIsAdmin = useRef();
  const refInputPassword = useRef();

  // Declaration of Request Options: GET All Users
  const viewAllUsersRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const viewAllUsersRequestInfo = {
    method: 'GET',
    headers: viewAllUsersRequestHeaders,
    redirect: 'follow'
  }
  const triggerViewAllUsers = () => {
    const viewAllUsersResponse = api(`${BASE_URL}${ALL_USERS}`, viewAllUsersRequestInfo);
    viewAllUsersResponse.then(response => {
      console.log(response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setUsersList(response.Result)
      }
    })
  }

  // Declaration of Request Options: PUT User
  const updateUserRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const updateUserRequestData = JSON.stringify({
    "name" : nameValue,
    "last_name" : lastNameValue,
    "email" : emailValue,
    "profile" : profileValue,
    "is_admin" : isAdminValue ? "T" : "F",
    "user_password" : passwordValue
  });
  const updateUserRequestInfo = {
    method: 'PUT',
    headers: updateUserRequestHeaders,
    body: updateUserRequestData,
    redirect: 'follow'
  }
  const triggerUpdateUser = (userId) => {
    const updateUserResponse = api(`${BASE_URL}${UPDATE_USER}${userId}`, updateUserRequestInfo);
    updateUserResponse.then(response => {
      console.log("PUT", response)
      if (response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.status === 204) {
        triggerViewAllUsers()
        setEditActive(false)
      }
    })
  }

  // Declaration of Request Options: DELETE User
  const deleteUserRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const deleteUserRequestInfo = {
    method: 'DELETE',
    headers: deleteUserRequestHeaders,
    redirect: 'follow'
  }
  const triggerDeleteUser = (userId) => {
    const deleteUserResponse = api(`${BASE_URL}${DELETE_USER}${userId}`, deleteUserRequestInfo);
    deleteUserResponse.then(response => {
      console.log("DELETE", response)
      if (response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.status === 204) {
        triggerViewAllUsers()
      }
    })
  }

  useEffect(()=> {
    triggerViewAllUsers()
  }, [])

  return (

    <Container>
      <Link to="/users"> Back to Users menu </Link>
      <Head>
        <h1>USERS</h1>
        <h2>View All Users</h2>
      </Head>
      <UsersTable>
        <TableHeadRow>
          <h5>Name</h5>
          <h5>Last Name</h5>
          <h5>Email</h5>
          <h5>Is Admin</h5>
          <h5>Actions</h5>
        </TableHeadRow>
      {usersList.length > 0 ? 
        <>
          {usersList.map((user, index) => {
            return (
              <TableUserRow key={`user${index}`} userId={user.id_user}>
                <div>{user.name}</div>
                <div>{user.last_name}</div>
                <div>{user.email}</div>
                <div>{user.is_admin === "T" ? "True" : "False"}</div>
                <div className="users-ActionBtns">
                  <button 
                    className="users-Delete"
                    onClick={() => {
                      triggerDeleteUser(user.id_user)
                    }}
                  >
                    <FaTrashAlt size={18} title="Delete" />  
                  </button>
                  <button 
                    className="users-Update"
                    onClick={() => {
                      console.log(user.id_user)
                      setUserIdToUpdate(user.id_user)
                      setEditActive(true)
                    }}
                  >
                    <FaEdit size={18} title="Edit" />  
                  </button>
                </div>
              </TableUserRow>
            )
          })}
        </>
        : 
        <div>No Users</div>
      }
      </UsersTable>
      {editActive ? 
        <OverlayUpdate>
          <FormContainer>
        <button className="closeEdit" onClick={()=>{setEditActive(false)}}>
          <FaTimes size={18} />
        </button>
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
            <button onClick={()=>{
              console.log("trigger update")
              console.log("ID:", userIdToUpdate)
              triggerUpdateUser(userIdToUpdate)
            }}> Update User </button >
        </InputLabelContainer>
      </FormContainer>
        </OverlayUpdate> 
        : 
        <></>
      }
    
    </Container>

  )
}

export default AllUsers;
