import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";
import api from '../../services/api';
import UserAuthContext from '../../context/auth';

import { FaTrashAlt, FaEdit, FaTimes} from 'react-icons/fa'
import { Container, Head, UsersTable, TableHeadRow, TableUserRow, OverlayUpdate, FormContainer, InputLabelContainer } from "./styles";
import './styles.css'

const loggedOff = {isLoggedIn: false, token: '', isAdmin: ''}

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";


const ALL_USERS = "/users/allRegistered";
const UPDATE_USER = "/users/updateUserId:";
const DELETE_USER = "/users/deleteUserId:";

const ALL_COMPANIES = "/companies/listAll";
const CREATE_COMPANIES = "/companies/create";
const UPDATE_COMPANIES = "/companies/updateCompanyId:";
const DELETE_COMPANIES = "/companies/deleteCompanyId:";

function Companies() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);
  
  // Declaration of States:
  const [companiesList, setCompaniesList] = useState([])
  const [editActive, setEditActive] = useState(false)

  const [companyNameValue, setCompanyNameValue] = useState("")
  const [companyAddressValue, setCompanyAddressValue] = useState("")
  const [companyEmailValue, setCompanyEmailValue] = useState("")
  const [companyPhoneValue, setCompanyPhoneValue] = useState("")
  const [company_CityId, setCompany_CityId] = useState("")
  const [companyIdToUpdate, setCompanyIdToUpdate] = useState()

  // Declaration of References:
  const refInputCompanyName = useRef();
  const refInputCompanyAddress = useRef();
  const refInputCompanyEmail = useRef();
  const refInputCompanyPhone = useRef();
  const refInputCompany_CityId = useRef();

  // Declaration of Request Options: GET All Users
  const viewAllCompaniesRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const viewAllCompaniesRequestInfo = {
    method: 'GET',
    headers: viewAllCompaniesRequestHeaders,
    redirect: 'follow'
  }
  const triggerViewAllCompanies = () => {
    const viewAllCompaniesResponse = api(`${BASE_URL}${ALL_COMPANIES}`, viewAllCompaniesRequestInfo);
    viewAllCompaniesResponse.then(response => {
      console.log(response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setCompaniesList(response.Result)
      }
    })
  }

  // Declaration of Request Options: PUT User
  const updateUserRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const updateUserRequestData = JSON.stringify({
    "name_company" : companyNameValue,
    "address_company" : companyAddressValue,
    "email_company" : companyEmailValue,
    "phone_company" : companyPhoneValue,
    "id_city" : company_CityId
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
        triggerViewAllCompanies()
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
        triggerViewAllCompanies()
      }
    })
  }

  useEffect(()=> {
    triggerViewAllCompanies()
  }, [])

  return (

    <Container>
      <Link to="/"> Back to Home </Link>
      <Head>
        <h1>COMPANIES</h1>
      </Head>
      <UsersTable>
        <TableHeadRow>
          <h5>Name</h5>
          <h5>Address</h5>
          <h5>Email</h5>
          <h5>Phone</h5>
          <h5>Actions</h5>
        </TableHeadRow>
      {companiesList.length > 0 ? 
        <>
          {companiesList.map((company, index) => {
            return (
              <TableUserRow key={`company${index}`} companyId={company.id_company}>
                <div>{company.name_company}</div>
                <div>{company.address_company}</div>
                <div>{company.email_company}</div>
                <div>{company.phone_company}</div>
                <div className="companies-ActionBtns">
                  <button 
                    className="companies-Delete"
                    onClick={() => {
                      triggerDeleteUser(company.id_company)
                    }}
                  >
                    <FaTrashAlt size={18} title="Delete" />  
                  </button>
                  <button 
                    className="companies-Update"
                    onClick={() => {
                      console.log(company.id_company)
                      setCompanyIdToUpdate(company.id_company)
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
            ref={refInputCompanyName}
            onChange={()=>{
              setCompanyNameValue(refInputCompanyName.current.value)
            }} 
          />
        </InputLabelContainer>
        <InputLabelContainer>
          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            name="lastName"
            type="text"
            ref={refInputCompanyAddress}
            onChange={()=>{
              setCompanyAddressValue(refInputCompanyAddress.current.value)
            }} 
          />
        </InputLabelContainer>
        <InputLabelContainer>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            name="email"
            type="email"
            ref={refInputCompanyEmail}
            onChange={()=>{
              setCompanyEmailValue(refInputCompanyEmail.current.value)
            }} 
          />
        </InputLabelContainer>

        <InputLabelContainer>
          <label htmlFor="profile">Profile</label>
          <input 
            id="profile" 
            name="profile"
            type="text"
            ref={refInputCompanyPhone}
            onChange={()=>{
              setCompanyPhoneValue(refInputCompanyPhone.current.value)
            }} 
          />
        </InputLabelContainer>
        <InputLabelContainer>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password"
            type="password"
            ref={refInputCompany_CityId}
            onChange={()=>{
              setCompany_CityId(refInputCompany_CityId.current.value)
            }} 
            />
        </InputLabelContainer>
      
        <InputLabelContainer>
            <button onClick={()=>{
              console.log("trigger update")
              console.log("ID:", companyIdToUpdate)
              triggerUpdateUser(companyIdToUpdate)
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

export default Companies;
