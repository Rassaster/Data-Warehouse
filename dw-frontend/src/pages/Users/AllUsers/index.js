import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from "react-router-dom";
import api from '../../../services/api';
import UserAuthContext from '../../../context/auth';
import './styles.css'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const UPDATE_USER = "/users/update:";
const DELETE_USER = "/users/deleteUser:";

function AllUsers() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  return (
    <>
      <Link to="/users">Back to Users Menu</Link>
      <h1>USERS</h1>
      <h2>View All Users</h2>
    </>

  )
}

export default AllUsers;
