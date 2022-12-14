import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";
import api from '../../services/api';
import UserAuthContext from '../../context/auth';

import { FaTrashAlt, FaEdit, FaTimes, FaPlus} from 'react-icons/fa'
import { 
  Container, 
  Head, 
  RegionsList, 
  RegionItem, 
  CountryItem, 
  CityItem, 
  ActionBtnsContainer,
  OverlayForm,
  RegionForm,
  InputLabelContainer
} from "./styles";
import './styles.css'

const loggedOff = {isLoggedIn: false, token: '', isAdmin: ''}

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const ALL_REGIONS = "/regions/listAll";
const ALL_COUNTRIES = "/countries/listAll";
const ALL_CITIES = "/cities/listAll";
const COUNTRIES_IN_REGION = "/countries/regionId:";
const CITIES_IN_COUNTRY = "/cities/countryId:";
const CREATE_REGION = "/regions/create";
const UPDATE_REGION = "/regions/updateRegionId:";
const DELETE_REGION = "/regions/deleteRegionId:";


function Locations() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  // Declaration of States:
  const [regionsList, setRegionsList] = useState([])
  const [countriesList, setCountriesList] = useState([])
  const [citiesList, setCitiesList] = useState([])

  const [popupOpen, setPopupOpen] = useState(false)

  const [createRegionForm, setCreateRegionForm] = useState(false)
  const [regionAcronymValue, setRegionAcronymValue] = useState("")
  const [regionNameValue, setRegionNameValue] = useState("")
  const [editRegionForm, setEditRegionForm] = useState(false)
  const [regionIdToUpdate, setRegionIdToUpdate] = useState()

  // Declaration of References:
  const refInputRegionAcronym = useRef()
  const refInputRegionName = useRef()


  // Declaration of Request Options: GET All Regions
  const viewAllRegionsRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const viewAllRegionsRequestInfo = {
    method: 'GET',
    headers: viewAllRegionsRequestHeaders,
    redirect: 'follow'
  }
  const triggerViewAllRegions = () => {
    const viewAllRegionsResponse = api(`${BASE_URL}${ALL_REGIONS}`, viewAllRegionsRequestInfo);
    viewAllRegionsResponse.then(response => {
      // console.log("REGIONS RESPONSE", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setRegionsList(response.Result)
        // console.log("REGIONS LIST", regionsList)
      }
    })
  }
  // Declaration of Request Options: POST Create Region
  const createRegionRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const createRegionRequestData = JSON.stringify({
    "acronym_region" : regionAcronymValue,
    "name_region" : regionNameValue
  });
  const createRegionRequestInfo = {
    method: 'POST',
    headers: createRegionRequestHeaders,
    body: createRegionRequestData,
    redirect: 'follow'
  }
  const triggerCreateRegion = () => {
    const createRegionResponse = api(`${BASE_URL}${CREATE_REGION}`, createRegionRequestInfo);
    createRegionResponse.then(response => {
      console.log(response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 201) {
        triggerViewAllRegions()
        setCreateRegionForm(false)
        setPopupOpen(false)
      }
    })
  }
  // Declaration of Request Options: UPDATE  Region
  const updateRegionRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const updateRegionRequestData = JSON.stringify({
    "acronym_region" : regionAcronymValue,
    "name_region" : regionNameValue
  });
  const updateRegionRequestInfo = {
    method: 'PUT',
    headers: updateRegionRequestHeaders,
    body: updateRegionRequestData,
    redirect: 'follow'
  }
  const triggerUpdateRegion = (regionId) => {
    const updateRegionResponse = api(`${BASE_URL}${UPDATE_REGION}${regionId}`, updateRegionRequestInfo);
    updateRegionResponse.then(response => {
      console.log(response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.status === 204 || response.Status === 409) {
        triggerViewAllRegions(false)
        setEditRegionForm(false)
        setPopupOpen(false)
      }
    })
  }
  // Declaration of Request Options: DELETE Region
  const deleteRegionRequestHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authState.token}`
  };
  const deleteRegionRequestInfo = {
      method: 'DELETE',
      headers: deleteRegionRequestHeaders,
      redirect: 'follow'
  }
  const triggerDeleteRegion = (regionId) => {
      const deleteRegionResponse = api(`${BASE_URL}${DELETE_REGION}${regionId}`, deleteRegionRequestInfo);
      deleteRegionResponse.then(response => {
        console.log("DELETE", response)
        if (response.status === 403) {
          setAuthState(loggedOff)
        }
        if (response.status === 204) {
          triggerViewAllRegions()
        }
      })
  }


  // Declaration of Request Options: GET All Countries
  const viewAllCountriesRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const viewAllCountriesRequestInfo = {
    method: 'GET',
    headers: viewAllCountriesRequestHeaders,
    redirect: 'follow'
  }
  const triggerViewAllCountries = () => {
    const viewAllCountriesResponse = api(`${BASE_URL}${ALL_COUNTRIES}`, viewAllCountriesRequestInfo);
    viewAllCountriesResponse.then(response => {
      // console.log("COUNTRIES RESPONSE", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setCountriesList(response?.Result)
        // console.log("COUNTRIES LIST", countriesList)
      }
    })
  }
  // Declaration of Request Options: GET All Cities
  const viewAllCitiesRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const viewAllCitiesRequestInfo = {
    method: 'GET',
    headers: viewAllCitiesRequestHeaders,
    redirect: 'follow'
  }
  const triggerViewAllCities = () => {
    const viewAllCitiesResponse = api(`${BASE_URL}${ALL_CITIES}`, viewAllCitiesRequestInfo);
    viewAllCitiesResponse.then(response => {
      // console.log("CITIES RESPONSE", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setCitiesList(response.Result)
        // console.log("CITIES LIST", citiesList)
      }
    })
  }


  useEffect(()=> {
    triggerViewAllRegions()
    triggerViewAllCountries()
    triggerViewAllCities()
  }, [])

  return (
    <Container>
      <Link to="/"> Home </Link>
      <Head>
        <h1>Locations</h1>
      </Head>
      <RegionsList>
        <ActionBtnsContainer>
          <button
            onClick={()=>{
              setPopupOpen(true)
              setCreateRegionForm(true)
            }}
            className="region-Add-Region"
          >
            Add Region<FaPlus size={16} title="Add Country" />  
          </button>
        </ActionBtnsContainer>
        {regionsList.length > 0 ? 
            <> 
              {regionsList.map((region, index) => {
                return (
                  <RegionItem key={`${region.region_name}${index}`}>
                    <h3>
                      {region.name_region} (Region Id: {region.id_region})
                      <ActionBtnsContainer>
                        <button 
                          onClick={()=>{triggerDeleteRegion(region.id_region)}} className="region-Delete"
                        >
                          <FaTrashAlt size={16} title="Delete Region" />  
                        </button>
                        <button 
                          onClick={()=>{
                            setPopupOpen(true)
                            setEditRegionForm(true)
                            setRegionIdToUpdate(region.id_region)
                          }}
                          className="region-Edit"
                        >
                          <FaEdit size={16} title="Edit Region" />  
                        </button>
                        <button className="region-Add-Country">
                          <FaPlus size={16} title="Add Country" />  
                        </button>
                      </ActionBtnsContainer>
                    </h3>
                    {countriesList.length > 0 ? 
                      <>
                        {countriesList.map((country, index) => {
                          if (Number(country.id_region) === region.id_region) {
                            return (
                              <CountryItem key={`${country.name_country}${index}`}>
                                <h4>
                                  {country.name_country} (Country Id: {country.id_country})
                                  <ActionBtnsContainer>
                                    <button className="country-Delete">
                                      <FaTrashAlt size={16} title="Delete Country" />  
                                    </button>
                                    <button className="country-Edit">
                                      <FaEdit size={16} title="Edit Country" />  
                                    </button>
                                    <button className="country-Add-City">
                                      <FaPlus size={16} title="Add City" />  
                                    </button>
                                  </ActionBtnsContainer>
                                </h4>
                                {citiesList.length > 0 ? 
                                  <>
                                    {citiesList.map((city, index) => {
                                      if (Number(city.id_country) === country.id_country) {
                                        return (
                                          <CityItem key={`${city.name_city}${index}`}>
                                            <h5>
                                              {city.name_city} (City Id: {city.id_city})
                                              <ActionBtnsContainer className="cityBtns">
                                                <button className="city-Delete">
                                                  <FaTrashAlt size={16} title="Delete City" />  
                                                </button>
                                                <button className="city-Edit">
                                                  <FaEdit size={16} title="Edit City" />  
                                                </button>
                                              </ActionBtnsContainer>
                                            </h5>
                                          </CityItem> 
                                        )
                                      }
                                    })}
                                  </>
                                  : 
                                  <p>No Cities Registered</p>
                                }
                              </CountryItem> 
                            )
                          }
                        })}
                      </>
                      : 
                      <p>No Cities Registered</p>
                    }
                  </RegionItem> 
                )
              })}
            </>
          : 
          <p>No Regions Registered</p>
        }
      </RegionsList>

      {popupOpen ? 
        <OverlayForm>
          
          
          {/* CREATE REGION POPUP */}
          {createRegionForm ? 
            <RegionForm>
              <h2>Create New Region</h2>
              <button className="closeEdit" onClick={()=>{setPopupOpen(false)}}>
                <FaTimes size={18} />
              </button>
            
              <InputLabelContainer>
                <label htmlFor="regionAcronym">Region Acronym</label>
                <input 
                  id="regionAcronym" 
                  name="regionAcronym"
                  type="text"
                  ref={refInputRegionAcronym}
                  onChange={()=>{
                    setRegionAcronymValue(refInputRegionAcronym.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                <label htmlFor="regionName">Region Name</label>
                <input 
                  id="regionName" 
                  name="regionName"
                  type="text"
                  ref={refInputRegionName}
                  onChange={()=>{
                    setRegionNameValue(refInputRegionName.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerCreateRegion()
                  }}> Create New Region </button >
              </InputLabelContainer>
            </RegionForm>
            : 
            <></>
          }

          {/* UPDATE REGION POPUP */}
          {editRegionForm ? 
            <RegionForm>
              <h2>Edit Region</h2>
              <button className="closeEdit" onClick={()=>{setPopupOpen(false)}}>
                <FaTimes size={18} />
              </button>
            
              <InputLabelContainer>
                <label htmlFor="regionAcronymEdit">Edit Region Acronym</label>
                <input 
                  id="regionAcronymEdit" 
                  name="regionAcronymEdit"
                  type="text"
                  ref={refInputRegionAcronym}
                  onChange={()=>{
                    setRegionAcronymValue(refInputRegionAcronym.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                <label htmlFor="regionNameEdit">Edit Region Name</label>
                <input 
                  id="regionNameEdit" 
                  name="regionNameEdit"
                  type="text"
                  ref={refInputRegionName}
                  onChange={()=>{
                    setRegionNameValue(refInputRegionName.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerUpdateRegion(regionIdToUpdate)
                  }}> Edit Region </button >
              </InputLabelContainer>
            </RegionForm>
            : 
            <></>
          }



          
        </OverlayForm> 
        : 
        <></>
      }






    </Container>
  )
}

export default Locations;
