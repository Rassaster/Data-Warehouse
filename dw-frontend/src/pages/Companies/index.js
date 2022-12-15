import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';
import UserAuthContext from '../../context/auth';

import { FaTrashAlt, FaEdit, FaTimes, FaPlus} from 'react-icons/fa'
import { 
  Container, 
  Head, 
  ActionBtnsContainer,
  CompaniesTable, 
  TableHeadRow, 
  TableCompanyRow, 
  OverlayUpdate, 
  FormContainer, 
  InputLabelContainer } from "./styles";
import './styles.css'

const loggedOff = {isLoggedIn: false, token: '', isAdmin: ''}

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";

const ALL_COMPANIES = "/companies/listAll";
const CREATE_COMPANIES = "/companies/create";
const GET_COMPANY_BYID = "/companies/companyId:";
const UPDATE_COMPANIES = "/companies/updateCompanyId:";
const DELETE_COMPANIES = "/companies/deleteCompanyId:";

function Companies() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);
  
  // Declaration of States:
  const [companiesList, setCompaniesList] = useState([])

  const [popupOpen, setPopupOpen] = useState(false)
  const [createActive, setCreateActive] = useState(false)
  const [editActive, setEditActive] = useState(false)

  const [companyNameValue, setCompanyNameValue] = useState("")
  const [companyAddressValue, setCompanyAddressValue] = useState("")
  const [companyEmailValue, setCompanyEmailValue] = useState("")
  const [companyPhoneValue, setCompanyPhoneValue] = useState("")
  const [company_CityId, setCompany_CityId] = useState("")
  const [companyIdToUpdate, setCompanyIdToUpdate] = useState()
  
  // Declaration of References:
  const refInputCompanyNameNew = useRef();
  const refInputCompanyAddressNew = useRef();
  const refInputCompanyEmailNew = useRef();
  const refInputCompanyPhoneNew = useRef();
  const refInputCompany_CityIdNew = useRef();

  const refInputCompanyName = useRef();
  const refInputCompanyAddress = useRef();
  const refInputCompanyEmail = useRef();
  const refInputCompanyPhone = useRef();
  const refInputCompany_CityId = useRef();

  // Declaration of Request Options: GET All Companies
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
      if (response.Status === 403 || response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setCompaniesList(response.Result)
      }
    })
  }

  // Declaration of Request Options: POST New Company
  const createNewCompanyRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const createNewCompanyRequestData = JSON.stringify({
    "name_company" : companyNameValue,
    "address_company" : companyAddressValue,
    "email_company" : companyEmailValue,
    "phone_company" : companyPhoneValue,
    "id_city" : Number(company_CityId)
  });
  const createNewCompanyRequestInfo = {
    method: 'POST',
    headers: createNewCompanyRequestHeaders,
    body: createNewCompanyRequestData,
    redirect: 'follow'
  }
  const triggerCompanyCreation = () => {
    const companyCreationResponse = api(`${BASE_URL}${CREATE_COMPANIES}`, createNewCompanyRequestInfo);
    companyCreationResponse.then(response => {
      console.log("RES", response)
      if(response.Status === 201) {
        triggerViewAllCompanies()
        setPopupOpen(false)
        setCreateActive(false)
      }
    })
  }

  // Declaration of Request Options: GET Company by Id
  const getCompanyByIdRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const getCompanyByIdRequestInfo = {
    method: 'GET',
    headers: getCompanyByIdRequestHeaders,
    redirect: 'follow'
  }
  const triggerGetCompanyById = (companyId) => {
    const getCompanyByIdResponse = api(`${BASE_URL}${GET_COMPANY_BYID}${companyId}`,getCompanyByIdRequestInfo);
    getCompanyByIdResponse.then(response => {
      console.log("GET", response)
      if (response.status === 403 || response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200 || response.status === 200) {
        setCompanyIdToUpdate(companyId)
        refInputCompanyName.current.value = response.Result.name_company;
        refInputCompanyAddress.current.value = response.Result.address_company;
        refInputCompanyEmail.current.value = response.Result.email_company;
        refInputCompanyPhone.current.value = response.Result.phone_company;
        refInputCompany_CityId.current.value = response.Result.id_city;

        setCompanyNameValue(response.Result.name_company)
        setCompanyAddressValue(response.Result.address_company)
        setCompanyEmailValue(response.Result.email_company)
        setCompanyPhoneValue(response.Result.phone_company)
        setCompany_CityId(response.Result.id_city)
      }
    })
  }
  // Declaration of Request Options: PUT Company
  const updateCompanyRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const updateCompanyRequestData = JSON.stringify({
    "name_company" : companyNameValue,
    "address_company" : companyAddressValue,
    "email_company" : companyEmailValue,
    "phone_company" : companyPhoneValue,
    "id_city" : Number(company_CityId)
  });
  const updateCompanyRequestInfo = {
    method: 'PUT',
    headers: updateCompanyRequestHeaders,
    body: updateCompanyRequestData,
    redirect: 'follow'
  }
  const triggerUpdateCompany = (companyId) => {
    const updateCompanyResponse = api(`${BASE_URL}${UPDATE_COMPANIES}${companyId}`, updateCompanyRequestInfo);
    updateCompanyResponse.then(response => {
      console.log("PUT", response)
      if (response.status === 403 || response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.status === 204) {
        triggerViewAllCompanies()
        setPopupOpen(false)
        setEditActive(false)
      }
    })
  }
  // Declaration of Request Options: DELETE Company
  const deleteCompanyRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const deleteCompanyRequestInfo = {
    method: 'DELETE',
    headers: deleteCompanyRequestHeaders,
    redirect: 'follow'
  }
  const triggerDeleteCompany = (companyId) => {
    const deleteCompanyResponse = api(`${BASE_URL}${DELETE_COMPANIES}${companyId}`, deleteCompanyRequestInfo);
    deleteCompanyResponse.then(response => {
      console.log("DELETE", response)
      if (response.status === 403 || response.status === 403) {
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
        <ActionBtnsContainer>
          <button
            onClick={()=>{
              setPopupOpen(true)
              setCreateActive(true)
            }}
            className="region-Add-Region"
          >
            Add Company<FaPlus size={16} title="Add Country" />  
          </button>
        </ActionBtnsContainer>
      <CompaniesTable>
        <TableHeadRow>
          <h5>Name</h5>
          <h5>City, Country</h5>
          <h5>Address</h5>
          <h5>Email</h5>
          <h5>Phone</h5>
          <h5>Actions</h5>
        </TableHeadRow>
      {companiesList.length > 0 ? 
        <>
          {companiesList.map((company, index) => {
            return (
              <TableCompanyRow key={`company${index}`} companyId={company.id_company}>
                <div>{company.name_company}</div>
                <div>{company.name_city}, {company.name_country}</div>
                <div>{company.address_company}</div>
                <div>{company.email_company}</div>
                <div>{company.phone_company}</div>
                <div className="companies-ActionBtns">
                  <button 
                    className="companies-Delete"
                    onClick={() => {
                      triggerDeleteCompany(company.id_company)
                    }}
                  >
                    <FaTrashAlt size={18} title="Delete" />  
                  </button>
                  <button 
                    className="companies-Update"
                    onClick={() => {
                      triggerGetCompanyById(company.id_company)
                      setPopupOpen(true)
                      setEditActive(true)
                    }}
                  >
                    <FaEdit size={18} title="Edit" />  
                  </button>
                </div>
              </TableCompanyRow>
            )
          })}
        </>
        : 
        <div>No Companies</div>
      }
      </CompaniesTable>
      {popupOpen ? 
        <OverlayUpdate>

          {/* CREATE COMPANY POPUP */}
          {createActive ? 
            <FormContainer>
              <h2>Create Company</h2>
              <button 
                onClick={()=>{
                  setPopupOpen(false)
                  setCreateActive(false)
                }}
                className="closeEdit"
              >
                <FaTimes size={18} />
              </button>

              <InputLabelContainer>
                <label htmlFor="companyNameNew">Company Name</label>
                <input 
                  id="companyName" 
                  name="companyName"
                  type="text"
                  ref={refInputCompanyNameNew}
                  onChange={()=>{
                    setCompanyNameValue(refInputCompanyNameNew.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="AddressNew">Address</label>
                <input 
                  id="AddressNew" 
                  name="AddressNew"
                  type="text"
                  ref={refInputCompanyAddressNew}
                  onChange={()=>{
                    setCompanyAddressValue(refInputCompanyAddressNew.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="emailNew">Email</label>
                <input 
                  id="emailNew" 
                  name="emailNew"
                  type="email"
                  ref={refInputCompanyEmailNew}
                  onChange={()=>{
                    setCompanyEmailValue(refInputCompanyEmailNew.current.value)
                  }} 
                />
              </InputLabelContainer>
  
              <InputLabelContainer>
                <label htmlFor="phoneNew">Phone</label>
                <input 
                  id="phoneNew" 
                  name="phoneNew"
                  type="text"
                  ref={refInputCompanyPhoneNew}
                  onChange={()=>{
                    setCompanyPhoneValue(refInputCompanyPhoneNew.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="cityIdNew">City Id</label>
                <input 
                  id="cityIdNew" 
                  name="cityIdNew"
                  type="text"
                  ref={refInputCompany_CityIdNew}
                  onChange={()=>{
                    setCompany_CityId(refInputCompany_CityIdNew.current.value)
                  }} 
                  />
              </InputLabelContainer>

              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerCompanyCreation()
                  }}> Create Company </button >
              </InputLabelContainer>
            </FormContainer>      
            : 
            <></>
          }

          {/* UPDATE COMPANY POPUP */}
          {editActive ? 
            <FormContainer>
              <h2>Edit Company</h2>
              <button 
                onClick={()=>{
                  setPopupOpen(false)
                  setEditActive(false)
                }}
                className="closeEdit"
              >
                <FaTimes size={18} />
              </button>
              
              <InputLabelContainer>
                <label htmlFor="companyName">Company Name</label>
                <input 
                  id="companyName" 
                  name="companyName"
                  type="text"
                  ref={refInputCompanyName}
                  onChange={()=>{
                    setCompanyNameValue(refInputCompanyName.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="Address">Address</label>
                <input 
                  id="Address" 
                  name="Address"
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
                <label htmlFor="phone">Phone</label>
                <input 
                  id="phone" 
                  name="phone"
                  type="text"
                  ref={refInputCompanyPhone}
                  onChange={()=>{
                    setCompanyPhoneValue(refInputCompanyPhone.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="cityId">City Id</label>
                <input 
                  id="cityId" 
                  name="cityId"
                  type="text"
                  ref={refInputCompany_CityId}
                  onChange={()=>{
                    setCompany_CityId(refInputCompany_CityId.current.value)
                  }} 
                  />
              </InputLabelContainer>

              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerUpdateCompany(companyIdToUpdate)
                  }}> Update Company </button >
              </InputLabelContainer>
            </FormContainer>      
            : 
            <></>
          }

        </OverlayUpdate> 
        : 
        <></>
      }
    
    </Container>

  )
}

export default Companies;
