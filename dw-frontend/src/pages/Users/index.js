import React, { useState, useEffect, useRef, useContext } from 'react';
import api from '../../services/api';
import UserAuthContext from '../../context/auth';
import './styles.css'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3000/dataWarehouse";
const CREATE_USER = "/users/create";
const UPDATE_USER = "/users/update:";
const DELETE_USER = "/users/deleteUser:";

function Users() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  return (
    <h1>USERS</h1>
  )
}

export default Users;
