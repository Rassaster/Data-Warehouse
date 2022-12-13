import React, { useState, useEffect, useRef, useContext } from 'react';
import api from '../../services/api';
import UserAuthContext from '../../context/auth';
import './styles.css'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const GET_ALL_CONTACT = "/contacts/listAll";
const CREATE_CONTACT = "/contacts/create";
const UPDATE_CONTACT = "/contacts/updateContactId:";
const DELETE_CONTACT = "/contacts/deleteContactId:";

function Contacts() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  return (
    <h1>Contacts</h1>
  )
}

export default Contacts;
