import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';
import UserAuthContext from '../../context/auth';

import { FaTrashAlt, FaEdit, FaTimes, FaPlus, FaSort} from 'react-icons/fa'
import { 
  Container, 
  Head, 
  ActionBtnsContainer,
  ContactsTable, 
  TableHeadRow, 
  TableContactRow, 
  OverlayUpdate, 
  FormContainer, 
  InputLabelContainer } from "./styles";
import './styles.css'

const loggedOff = {isLoggedIn: false, token: '', isAdmin: ''}

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";

const ALL_CONTACTS = "/contacts/listAll";
const CREATE_CONTACT = "/contacts/create";
const GET_CONTACT_BYID = "/contacts/ContactId:";
const UPDATE_CONTACTS = "/contacts/updateContactId:";
const DELETE_CONTACTS = "/contacts/deleteContactId:";

const ALL_COMPANIES = "/companies/listAll";

function Contacts() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);
  
  // Declaration of States:
  const [contactsList, setContactsList] = useState([])
  const [companiesList, setCompaniesList] = useState([])

  const [popupOpen, setPopupOpen] = useState(false)
  const [createActive, setCreateActive] = useState(false)
  const [editActive, setEditActive] = useState(false)

  const [selectedContacts, setSelectedContacts] = useState([])

  const [activeSort, setActiveSort] = useState(false)
  const [activeSortContact, setActiveSortContact] = useState()
  const [activeSortLocation, setActiveSortLocation] = useState()
  const [activeSortCompany, setActiveSortCompany] = useState()
  const [activeSortProfile, setActiveSortProfile] = useState()
  const [activeSortInterest, setActiveSortInterest] = useState()

  const [contactNameValue, setContactNameValue] = useState("")
  const [contactLastNameValue, setContactLastNameValue] = useState("")
  const [contactProfileValue, setContactProfileValue] = useState("")
  const [contactEmailValue, setContactEmailValue] = useState("")
  const [contact_CompanyId, setContact_CompanyId] = useState("")
  const [contactInterestValue, setContactInterestValue] = useState("")
  const [contactIdToUpdate, setContactIdToUpdate] = useState()
  
  // Declaration of References:
  const refInputContactNameNew = useRef();
  const refInputContactLastNameNew = useRef();
  const refInputContactProfileNew = useRef();
  const refInputContactEmailNew = useRef();
  const refInputContact_CompanyIdNew = useRef();
  const refInputContactInterestlNew = useRef();

  const refInputContactName = useRef();
  const refInputContactLastName = useRef();
  const refInputContactProfile = useRef();
  const refInputContactEmail = useRef();
  const refInputContact_CompanyId = useRef();
  const refInputContactInterest = useRef();

  // Declaration of Request Options: GET All Contacts
  const viewAllContactsRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const viewAllContactsRequestInfo = {
    method: 'GET',
    headers: viewAllContactsRequestHeaders,
    redirect: 'follow'
  }
  const triggerViewAllContacts = () => {
    const viewAllContactsResponse = api(`${BASE_URL}${ALL_CONTACTS}`, viewAllContactsRequestInfo);
    viewAllContactsResponse.then(response => {
      console.log(response)
      if (response.Status === 403 || response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setContactsList(response.Result)
      }
    })
  }

  // Declaration of Request Options: POST New Contact
  const createNewContactRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const createNewContactRequestData = JSON.stringify({
    "name_contact" : contactNameValue,
    "lastName_contact" : contactLastNameValue,
    "profile_contact" : contactProfileValue,
    "email_contact" : contactEmailValue,
    "id_company" : Number(contact_CompanyId),
    "interest_contact" : contactInterestValue ? contactInterestValue : "0%"
  });
  const createNewContactRequestInfo = {
    method: 'POST',
    headers: createNewContactRequestHeaders,
    body: createNewContactRequestData,
    redirect: 'follow'
  }
  const triggerContactCreation = () => {
    const contactCreationResponse = api(`${BASE_URL}${CREATE_CONTACT}`, createNewContactRequestInfo);
    contactCreationResponse.then(response => {
      console.log("RES", response)
      if(response.Status === 201) {
        triggerViewAllContacts()
        setPopupOpen(false)
        setCreateActive(false)
      }
    })
  }

  // Declaration of Request Options: GET Contact by Id
  const getContactByIdRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const getContactByIdRequestInfo = {
    method: 'GET',
    headers: getContactByIdRequestHeaders,
    redirect: 'follow'
  }
  const triggerGetContactById = (contactId) => {
    const getContactByIdResponse = api(`${BASE_URL}${GET_CONTACT_BYID}${contactId}`,getContactByIdRequestInfo);
    getContactByIdResponse.then(response => {
      console.log("GET", response)
      if (response.status === 403 || response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200 || response.status === 200) {
        setContactIdToUpdate(contactId)
        refInputContactName.current.value = response.Result.name_contact;
        refInputContactLastName.current.value = response.Result.lastName_contact;
        refInputContactProfile.current.value = response.Result.profile_contact;
        refInputContactEmail.current.value = response.Result.email_contact;
        refInputContact_CompanyId.current.value = response.Result.id_company;
        refInputContactInterest.current.value = response.Result.interest_contact;

        setContactNameValue(response.Result.name_contact)
        setContactLastNameValue(response.Result.lastName_contact)
        setContactProfileValue(response.Result.profile_contact)
        setContactEmailValue(response.Result.email_contact)
        setContact_CompanyId(response.Result.id_company)
      }
    })
  }
  // Declaration of Request Options: PUT Contact
  const updateContactRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const updateContactRequestData = JSON.stringify({
    "name_contact" : contactNameValue,
    "lastName_contact" : contactLastNameValue,
    "email_contact" : contactEmailValue,
    "profile_contact" : contactProfileValue,
    "id_company" : Number(contact_CompanyId),
    "interest_contact" : contactInterestValue ? contactInterestValue : "0%"
  });
  const updateContactRequestInfo = {
    method: 'PUT',
    headers: updateContactRequestHeaders,
    body: updateContactRequestData,
    redirect: 'follow'
  }
  const triggerUpdateContact = (contactId) => {
    const updateContactResponse = api(`${BASE_URL}${UPDATE_CONTACTS}${contactId}`, updateContactRequestInfo);
    updateContactResponse.then(response => {
      console.log("PUT", response)
      if (response.status === 403 || response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.status === 204) {
        triggerViewAllContacts()
        setPopupOpen(false)
        setEditActive(false)
      }
    })
  }
  // Declaration of Request Options: DELETE Contact
  const deleteContactRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const deleteContactRequestInfo = {
    method: 'DELETE',
    headers: deleteContactRequestHeaders,
    redirect: 'follow'
  }
  const triggerDeleteContact = (contactId) => {
    const deleteContactResponse = api(`${BASE_URL}${DELETE_CONTACTS}${contactId}`, deleteContactRequestInfo);
    deleteContactResponse.then(response => {
      console.log("DELETE", response)
      if (response.status === 403 || response.status === 403) {
        setAuthState(loggedOff)
      }
      if (response.status === 204) {
        triggerViewAllContacts()
      }
    })
  }
  /* **************************************************************** */
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

  useEffect(()=> {
    triggerViewAllContacts()
  }, [])

  return (

    <Container>
      <Head>
        <h1>CONTACTS</h1>
      </Head>
        <ActionBtnsContainer>
          <button
            onClick={()=>{
              setPopupOpen(true)
              setCreateActive(true)
              triggerViewAllCompanies()
            }}
            className="region-Add-Region"
          >
            Add Contact<FaPlus size={16} title="Add Country" />  
          </button>
        </ActionBtnsContainer>
      <ContactsTable>
        <TableHeadRow>
          <input type="checkbox" />
          <h5
            onClick={()=>{
              setActiveSort(true)
              activeSortContact ? setActiveSortContact(false) : setActiveSortContact(true)
              activeSortContact ? 
                setContactsList(contactsList.sort((a, b) => (a.name_contact > b.name_contact) ? 1 : -1))
                :
                setContactsList(contactsList.sort((a, b) => (a.name_contact < b.name_contact) ? 1 : -1))
            }}
          >
            Contact
            <FaSort size={14} />
          </h5>
          <h5
            onClick={()=>{
              setActiveSort(true)
              activeSortLocation? setActiveSortLocation(false) : setActiveSortLocation(true)
              activeSortLocation ? 
                setContactsList(contactsList.sort((a, b) => (a.name_country > b.name_country) ? 1 : -1))
                :
                setContactsList(contactsList.sort((a, b) => (a.name_country < b.name_country) ? 1 : -1))
            }}
          >
            Country, City / Region
            <FaSort size={14} />
          </h5>
          <h5
            onClick={()=>{
              setActiveSort(true)
              activeSortCompany ? setActiveSortCompany(false) : setActiveSortCompany(true)
              activeSortCompany ? 
                setContactsList(contactsList.sort((a, b) => (a.name_company > b.name_company) ? 1 : -1))
                :
                setContactsList(contactsList.sort((a, b) => (a.name_company < b.name_company) ? 1 : -1))
            }}
          >
            Company
            <FaSort size={14} />
          </h5>
          <h5
            onClick={()=>{
              setActiveSort(true)
              activeSortProfile ? setActiveSortProfile(false) : setActiveSortProfile(true)
              activeSortProfile ? 
                setContactsList(contactsList.sort((a, b) => (a.profile_contact > b.profile_contact) ? 1 : -1))
                :
                setContactsList(contactsList.sort((a, b) => (a.profile_contact < b.profile_contact) ? 1 : -1))
            }}
          >
            Profile
            <FaSort size={14} />
          </h5>
          <h5
            onClick={()=>{
              setActiveSort(true)
              activeSortInterest ? setActiveSortInterest(false) : setActiveSortInterest(true)
              activeSortInterest ? 
                setContactsList(contactsList.sort((a, b) => (a.interest_contact > b.interest_contact) ? 1 : -1))
                :
                setContactsList(contactsList.sort((a, b) => (a.interest_contact < b.interest_contact) ? 1 : -1))
            }}
          >
            Interest
            <FaSort size={14} />
          </h5>
          <h5>
            Actions
          </h5>
        </TableHeadRow>
      {contactsList.length > 0 || activeSort ? 
        <>
          {contactsList.map((contact, index) => {
            return (
              <TableContactRow  

                key={`contact${index}`} 
                contactId={contact.id_contact}
              >
                <input 
                  onClick={() => {
                    alert("suerte :)") 
                    console.log(selectedContacts)
                  }}
                  type="checkbox" />
                <div>
                  <p>{contact.name_contact} {contact.lastName_contact}</p>
                  <p className="emailChart">{contact.email_contact}</p>
                </div>
                <div>
                  <p>{contact.name_country}, {contact.name_city}</p>
                  <p className="emailChart">{contact.name_region}</p>
                </div>
                <div>{contact.name_company}</div>
                <div>{contact.profile_contact}</div>
                <div>{contact.interest_contact}</div>

                  <div className="contacts-ActionBtns">
                    <div className="dots">...</div>
                    <button 
                      className="contacts-Delete"
                      onClick={() => {
                        triggerDeleteContact(contact.id_contact)
                      }}
                    >
                      <FaTrashAlt size={18} title="Delete" />  
                    </button>
                    <button 
                      className="contacts-Update"
                      onClick={() => {
                        triggerGetContactById(contact.id_contact)
                        setPopupOpen(true)
                        setEditActive(true)
                        triggerViewAllCompanies()
                      }}
                    >
                      <FaEdit size={18} title="Edit" />  
                    </button>
                  </div>

              </TableContactRow>
            )
          })}
        </>
        : 
        <div>No Contacts</div>
      }
      </ContactsTable>
      {popupOpen ? 
        <OverlayUpdate>

          {/* CREATE CONTACT POPUP */}
          {createActive ? 
            <FormContainer>
              <h2>Create Contact</h2>
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
                <label htmlFor="contactNameNew">Name</label>
                <input 
                  id="contactNameNew" 
                  name="contactNameNew"
                  type="text"
                  ref={refInputContactNameNew}
                  onChange={()=>{
                    setContactNameValue(refInputContactNameNew.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="lastNameNew">Last Name</label>
                <input 
                  id="lastNameNew" 
                  name="lastNameNew"
                  type="text"
                  ref={refInputContactLastNameNew}
                  onChange={()=>{
                    setContactLastNameValue(refInputContactLastNameNew.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="profileNew">Profile</label>
                <input 
                  id="profileNew" 
                  name="profileNew"
                  type="text"
                  ref={refInputContactProfileNew}
                  onChange={()=>{
                    setContactProfileValue(refInputContactProfileNew.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="emailNew">Email</label>
                <input 
                  id="emailNew" 
                  name="emailNew"
                  type="email"
                  ref={refInputContactEmailNew}
                  onChange={()=>{
                    setContactEmailValue(refInputContactEmailNew.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="companyNew">Company</label>
                <select 
                  name="companyNew" 
                  id="companyNew"
                  ref={refInputContact_CompanyIdNew}
                  onChange={()=>{
                    setContact_CompanyId(refInputContact_CompanyIdNew.current.value)
                  }}
                >
                  <option value="" default disabled selected>Select a company</option>
                  {companiesList.length > 0 ? 
                    <>
                      {companiesList.map((company, index) => {
                        return (
                          <option key={`company${index}`} value={company.id_company}>{company.name_company}</option>
                        )
                      })}
                    </>
                    : 
                    <></>
                  }
                </select>
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="interestNew">Interest</label>
                <input 
                  id="interestNew" 
                  name="interestNew"
                  type="text"
                  ref={refInputContactInterestlNew}
                  onChange={()=>{
                    setContactInterestValue(refInputContactInterestlNew.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerContactCreation()
                  }}> Create Contact </button >
              </InputLabelContainer>
            </FormContainer>      
            : 
            <></>
          }

          {/* UPDATE CONTACT POPUP */}
          {editActive ? 
            <FormContainer>
              <h2>Edit Contact</h2>
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
                <label htmlFor="name">Name*</label>
                <input 
                  id="name" 
                  name="name"
                  type="text"
                  ref={refInputContactName}
                  onChange={()=>{
                    setContactNameValue(refInputContactName.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="lastName">Last Name*</label>
                <input 
                  id="lastName" 
                  name="lastName"
                  type="text"
                  ref={refInputContactLastName}
                  onChange={()=>{
                    setContactLastNameValue(refInputContactLastName.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="profile">Profile*</label>
                <input 
                  id="profile" 
                  name="profile"
                  type="text"
                  ref={refInputContactProfile}
                  onChange={()=>{
                    setContactProfileValue(refInputContactProfile.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="email">Email*</label>
                <input 
                  id="email" 
                  name="email"
                  type="email"
                  ref={refInputContactEmail}
                  onChange={()=>{
                    setContactEmailValue(refInputContactEmail.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="company">Company*</label>
                <select 
                  name="company" 
                  id="company"
                  ref={refInputContact_CompanyId}
                  onChange={()=>{
                    setContact_CompanyId(refInputContact_CompanyId.current.value)
                  }}
                >
                  <option value="" default disabled >Select a company</option>
                  {companiesList.length > 0 ? 
                    <>
                      {companiesList.map((company, index) => {
                        return (
                          <option 
                            key={`company${index}`}
                            selected={refInputContact_CompanyId === company.id_company ? true : false}
                            default={refInputContact_CompanyId === company.id_company ? true : false}
                            value={company.id_company}
                          >
                            {company.name_company}
                          </option>
                        )
                      })}
                    </>
                    : 
                    <></>
                  }
                </select>
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="interest">Interest</label>
                <input 
                  id="interest" 
                  name="interest"
                  type="text"
                  ref={refInputContactInterest}
                  onChange={()=>{
                    setContactInterestValue(refInputContactInterest.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerUpdateContact(contactIdToUpdate)
                  }}> Update Contact </button >
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

export default Contacts;
