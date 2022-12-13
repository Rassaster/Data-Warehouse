import React, { useState, useEffect, useRef, useContext } from 'react';
import api from '../../services/api';
import UserAuthContext from '../../context/auth';
import './styles.css'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const GET_ALL_COMPANIES = "/companies/listAll";
const CREATE_COMPANY = "/companies/create";
const UPDATE_COMPANY = "/companies/updateCompanyId:";
const DELETE_COMPANY = "/companies/deleteCompanyId:";

function Companies() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  return (
    <h1>Companies</h1>
  )
}

export default Companies;
