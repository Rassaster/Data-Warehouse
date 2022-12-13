import React, { useState, useEffect, useRef, useContext } from 'react';
import api from '../../services/api';
import UserAuthContext from '../../context/auth';
import './styles.css'

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const GET_ = "/";
const CREATE_ = "//create";
const UPDATE_ = "//updateCompanyId:";
const DELETE_ = "//deleteCompanyId:";

function Locations() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  return (
    <h1>Locations</h1>
  )
}

export default Locations;
