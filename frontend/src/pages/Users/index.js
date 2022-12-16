import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';
import UserAuthContext from '../../context/auth';
import './styles.css'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const CREATE_USER = "/users/create";
const UPDATE_USER = "/users/update:";
const DELETE_USER = "/users/deleteUser:";

function Users() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  return (
    <>
      <h1>USERS</h1>
      <Link to="/users/new">Register a New User</Link>
      <Link to="/users/viewAll">View All Users</Link>
    </>

  )
}

export default Users;
