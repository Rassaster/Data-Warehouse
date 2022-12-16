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
  LocationFormContainer,
  InputLabelContainer
} from "./styles";
import './styles.css'

const loggedOff = {isLoggedIn: false, token: '', isAdmin: ''}

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";

const ALL_REGIONS = "/regions/listAll";
const CREATE_REGION = "/regions/create";
const UPDATE_REGION = "/regions/updateRegionId:";
const DELETE_REGION = "/regions/deleteRegionId:";

const ALL_COUNTRIES = "/countries/listAll";
const CREATE_COUNTRY = "/countries/create";
const UPDATE_COUNTRY = "/countries/updateCountryId:";
const DELETE_COUNTRY = "/countries/deleteCountryId:";

const ALL_CITIES = "/cities/listAll";
const CREATE_CITY = "/cities/create";
const UPDATE_CITY = "/cities/updateCityId:";
const DELETE_CITY = "/cities/deleteCityId:";


function Locations() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  /* ********************************************** */
  /* ********************************************** */
  /* ********************************************** */
  // Declaration of States:
  const [regionsList, setRegionsList] = useState([])
  const [countriesList, setCountriesList] = useState([])
  const [citiesList, setCitiesList] = useState([])

  const [popupOpen, setPopupOpen] = useState(false)

  const [createRegionForm, setCreateRegionForm] = useState(false)
  const [regionAcronymValue, setRegionAcronymValue] = useState("")
  const [regionNameValue, setRegionNameValue] = useState("")
  const [regionIdToUpdate, setRegionIdToUpdate] = useState()
  const [editRegionForm, setEditRegionForm] = useState(false)

  const [createCountryForm, setCreateCountryForm] = useState(false)
  const [countryAcronymValue, setCountryAcronymValue] = useState("")
  const [countryNameValue, setCountryNameValue] = useState("")
  const [country_regionIdValue, setCountry_regionIdValue] = useState()
  const [country_RegionIdToCreate, setCountry_RegionIdToCreate] = useState()
  const [countryIdToUpdate, setCountryIdToUpdate] = useState()
  const [editCountryForm, setEditCountryForm] = useState(false)

  const [createCityForm, setCreateCityForm] = useState(false)
  const [cityAcronymValue, setCityAcronymValue] = useState("")
  const [cityNameValue, setCityNameValue] = useState("")
  const [city_CountryIdValue, setCity_CountryIdValue] = useState()
  const [city_CountryIdToCreate, setCity_CountryIdToCreate] = useState()
  const [cityIdToUpdate, setCityIdToUpdate] = useState()
  const [editCityForm, setEditCityForm] = useState(false)

  /* ********************************************** */
  /* ********************************************** */
  /* ********************************************** */
  // Declaration of References:
  const refInputRegionAcronym = useRef()
  const refInputRegionName = useRef()
  
  const refInputCountryAcronym = useRef()
  const refInputCountryName = useRef()
  const refInputCountry_RegionId = useRef()
  
  const refInputCityAcronym = useRef()
  const refInputCityName = useRef()
  const refInputCity_CountryId = useRef()

  /* ********************************************** */
  /* ********************************************** */
  /* ********************************************** */
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
        if (response.status === 403 || response.Status === 403) {
          setAuthState(loggedOff)
        }
        if (response.status === 204 || response.Status === 204) {
          triggerViewAllRegions()
        }
      })
  }

  /* ********************************************** */
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
  // Declaration of Request Options: POST Create Country
  const createCountryRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const createCountryRequestData = JSON.stringify({
    "acronym_country" : countryAcronymValue,
    "name_country" : countryNameValue,
    "id_region" : country_RegionIdToCreate
  });
  const createCountryRequestInfo = {
    method: 'POST',
    headers: createCountryRequestHeaders,
    body: createCountryRequestData,
    redirect: 'follow'
  }
  const triggerCreateCountry = () => {
    const createCountryResponse = api(`${BASE_URL}${CREATE_COUNTRY}`, createCountryRequestInfo);
    createCountryResponse.then(response => {
      console.log(response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 201) {
        setCreateCountryForm(false)
        triggerViewAllRegions()
        triggerViewAllCountries()
        setPopupOpen(false)
      }
    })
  }
  // Declaration of Request Options: UPDATE Country
  const updateCountryRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const updateCountryRequestData = JSON.stringify({
    "acronym_country" : countryAcronymValue,
    "name_country" : countryNameValue,
    "id_region" : Number(country_regionIdValue)
  });
  const updateCountryRequestInfo = {
    method: 'PUT',
    headers: updateCountryRequestHeaders,
    body: updateCountryRequestData,
    redirect: 'follow'
  }
  const triggerUpdateCountry = (countryId) => {
    const updateCountryResponse = api(`${BASE_URL}${UPDATE_COUNTRY}${countryId}`,updateCountryRequestInfo);
    updateCountryResponse.then(response => {
      console.log(response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.status === 204 || response.Status === 409) {
        triggerViewAllRegions()
        triggerViewAllCountries()
        setEditCountryForm(false)
        setPopupOpen(false)
      }
    })
  }
  // Declaration of Request Options: DELETE Country
  const deleteCountryRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const deleteCountryRequestInfo = {
      method: 'DELETE',
      headers: deleteCountryRequestHeaders,
      redirect: 'follow'
  }
  const triggerDeleteCountry = (countryId) => {
      const deleteCountryResponse = api(`${BASE_URL}${DELETE_COUNTRY}${countryId}`, deleteCountryRequestInfo);
      deleteCountryResponse.then(response => {
        console.log("DELETE", response)
        if (response.status === 403 || response.Status === 403) {
          setAuthState(loggedOff)
        }
        if (response.status === 204 || response.Status === 204) {
          triggerViewAllRegions()
          triggerViewAllCountries()
        }
      })
  }

  /* ********************************************** */ 
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
  // Declaration of Request Options: POST Create City
  const createCityRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const createCityRequestData = JSON.stringify({
    "acronym_city" : cityAcronymValue,
    "name_city" : cityNameValue,
    "id_country" : city_CountryIdToCreate
  });
  const createCityRequestInfo = {
    method: 'POST',
    headers: createCityRequestHeaders,
    body: createCityRequestData,
    redirect: 'follow'
  }
  const triggerCreateCity = () => {
    const createCityResponse = api(`${BASE_URL}${CREATE_CITY}`, createCityRequestInfo);
    createCityResponse.then(response => {
      console.log(response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 201) {
        setCreateCityForm(false)
        triggerViewAllRegions()
        triggerViewAllCountries()
        triggerViewAllCities()
        setPopupOpen(false)
      }
    })
  }
  // Declaration of Request Options: UPDATE City
  const updateCityRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const updateCityRequestData = JSON.stringify({
    "acronym_city" : cityAcronymValue,
    "name_city" : cityNameValue,
    "id_country" : Number(city_CountryIdValue)
  });
  const updateCityRequestInfo = {
    method: 'PUT',
    headers: updateCityRequestHeaders,
    body: updateCityRequestData,
    redirect: 'follow'
  }
  const triggerUpdateCity = (cityId) => {
    const updateCityResponse = api(`${BASE_URL}${UPDATE_CITY}${cityId}`, updateCityRequestInfo);
    updateCityResponse.then(response => {
      console.log(response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.status === 204 || response.Status === 409) {
        triggerViewAllRegions()
        triggerViewAllCountries()
        triggerViewAllCities()
        setEditCityForm(false)
        setPopupOpen(false)
      }
    })
  }
  // Declaration of Request Options: DELETE City
  const deleteCityRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const deleteCityRequestInfo = {
      method: 'DELETE',
      headers: deleteCityRequestHeaders,
      redirect: 'follow'
  }
  const triggerDeleteCity = (cityId) => {
      const deleteCityResponse = api(`${BASE_URL}${DELETE_CITY}${cityId}`, deleteCityRequestInfo);
      deleteCityResponse.then(response => {
        console.log("DELETE", response)
        if (response.status === 403 || response.Status === 403) {
          setAuthState(loggedOff)
        }
        if (response.status === 204 || response.Status === 204) {
          triggerViewAllRegions()
          triggerViewAllCountries()
          triggerViewAllCities()
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
      <Link to="/"> Back to Contacts </Link>
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
                        <button 
                          onClick={()=>{
                            setPopupOpen(true)
                            setCreateCountryForm(true)
                            setCountry_RegionIdToCreate(region.id_region)
                          }}
                          className="region-Add-Country"
                        >
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
                                    <button 
                                      onClick={()=>{
                                        triggerDeleteCountry(country.id_country)
                                      }}
                                      className="country-Delete"
                                    >
                                      <FaTrashAlt size={16} title="Delete Country" />  
                                    </button>
                                    <button 
                                      onClick={()=>{
                                        setPopupOpen(true)
                                        setEditCountryForm(true)
                                        setCountryIdToUpdate(country.id_country)
                                      }}
                                      className="country-Edit">
                                      <FaEdit size={16} title="Edit Country" />  
                                    </button>
                                    <button 
                                      onClick={()=>{
                                        setPopupOpen(true)
                                        setCreateCityForm(true)
                                        setCity_CountryIdToCreate(country.id_country)
                                      }}
                                      className="country-Add-City">
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
                                                <button 
                                                  onClick={()=>{
                                                    triggerDeleteCity(city.id_city)
                                                  }}
                                                  className="city-Delete">
                                                  <FaTrashAlt size={16} title="Delete City" />  
                                                </button>
                                                <button 
                                                  onClick={()=>{
                                                    setPopupOpen(true)
                                                    setEditCityForm(true)
                                                    setCityIdToUpdate(city.id_city)
                                                  }}
                                                  className="city-Edit">
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
            <LocationFormContainer>
              <h2>Create New Region</h2>
              <button className="closeEdit" onClick={()=>{
                setPopupOpen(false)
                setCreateRegionForm(false)
                setEditRegionForm(false)
                setCreateCountryForm(false)
                setEditCountryForm(false)
                setCreateCityForm(false)
                setEditCityForm(false)
                }}>
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
            </LocationFormContainer>
            : 
            <></>
          }
          {/* UPDATE REGION POPUP */}
          {editRegionForm ? 
            <LocationFormContainer>
              <h2>Edit Region</h2>
              <button className="closeEdit" onClick={()=>{
                setPopupOpen(false)
                setCreateRegionForm(false)
                setEditRegionForm(false)
                setCreateCountryForm(false)
                setEditCountryForm(false)
                setCreateCityForm(false)
                setEditCityForm(false)
                }}>
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
            </LocationFormContainer>
            : 
            <></>
          }

          {/* CREATE COUNTRY POPUP */}
          {createCountryForm ? 
            <LocationFormContainer>
              <h2>Create New Country</h2>
              <button className="closeEdit" onClick={()=>{
                setPopupOpen(false)
                setCreateRegionForm(false)
                setEditRegionForm(false)
                setCreateCountryForm(false)
                setEditCountryForm(false)
                setCreateCityForm(false)
                setEditCityForm(false)
                }}>
                <FaTimes size={18} />
              </button>
              <InputLabelContainer>
                <label htmlFor="countryAcronym">Country Acronym</label>
                <input 
                  id="countryAcronym" 
                  name="countryAcronym"
                  type="text"
                  ref={refInputCountryAcronym}
                  onChange={()=>{
                    setCountryAcronymValue(refInputCountryAcronym.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                <label htmlFor="countryName">Country Name</label>
                <input 
                  id="countryName" 
                  name="countryName"
                  type="text"
                  ref={refInputCountryName}
                  onChange={()=>{
                    setCountryNameValue(refInputCountryName.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerCreateCountry()
                  }}> Create Country </button >
              </InputLabelContainer>
            </LocationFormContainer>
            : 
            <></>
          }
          {/* UPDATE COUNTRY POPUP */}
          {editCountryForm ? 
            <LocationFormContainer>
              <h2>Edit Country</h2>
              <button className="closeEdit" onClick={()=>{
                setPopupOpen(false)
                setCreateRegionForm(false)
                setEditRegionForm(false)
                setCreateCountryForm(false)
                setEditCountryForm(false)
                setCreateCityForm(false)
                setEditCityForm(false)
                }}>
                <FaTimes size={18} />
              </button>
              <InputLabelContainer>
                <label htmlFor="countryAcronymEdit">Edit Country Acronym</label>
                <input 
                  id="countryAcronymEdit" 
                  name="countryAcronymEdit"
                  type="text"
                  ref={refInputCountryAcronym}
                  onChange={()=>{
                    setCountryAcronymValue(refInputCountryAcronym.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                <label htmlFor="countryNameEdit">Edit Country Name</label>
                <input 
                  id="countryNameEdit" 
                  name="countryNameEdit"
                  type="text"
                  ref={refInputCountryName}
                  onChange={()=>{
                    setCountryNameValue(refInputCountryName.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="countryRegionIdEdit">Change Region Id</label>
                <input 
                  id="countryRegionIdEdit" 
                  name="countryRegionIdEdit"
                  type="text"
                  ref={refInputCountry_RegionId}
                  onChange={()=>{
                    setCountry_regionIdValue(refInputCountry_RegionId.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerUpdateCountry(countryIdToUpdate)
                  }}> Edit Country </button >
              </InputLabelContainer>
            </LocationFormContainer>
            : 
            <></>
          }

          {/* CREATE CITY POPUP */}
          {createCityForm ? 
            <LocationFormContainer>
              <h2>Create New City</h2>
              <button className="closeEdit" onClick={()=>{
                setPopupOpen(false)
                setCreateRegionForm(false)
                setEditRegionForm(false)
                setCreateCountryForm(false)
                setEditCountryForm(false)
                setCreateCityForm(false)
                setEditCityForm(false)
                }}>
                <FaTimes size={18} />
              </button>
              <InputLabelContainer>
                <label htmlFor="cityAcronym">City Acronym</label>
                <input 
                  id="cityAcronym" 
                  name="cityAcronym"
                  type="text"
                  ref={refInputCityAcronym}
                  onChange={()=>{
                    setCityAcronymValue(refInputCityAcronym.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                <label htmlFor="cityName">Ciy Name</label>
                <input 
                  id="cityName" 
                  name="cityName"
                  type="text"
                  ref={refInputCityName}
                  onChange={()=>{
                    setCityNameValue(refInputCityName.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerCreateCity()
                  }}> Create City </button >
              </InputLabelContainer>
            </LocationFormContainer>
            : 
            <></>
          }
          {/* UPDATE CITY POPUP */}
          {editCityForm ? 
            <LocationFormContainer>
              <h2>Edit City</h2>
              <button className="closeEdit" onClick={()=>{
                setPopupOpen(false)
                setCreateRegionForm(false)
                setEditRegionForm(false)
                setCreateCountryForm(false)
                setEditCountryForm(false)
                setCreateCityForm(false)
                setEditCityForm(false)
                }}>
                <FaTimes size={18} />
              </button>
              <InputLabelContainer>
                <label htmlFor="cityAcronymEdit">Edit City Acronym</label>
                <input 
                  id="cityAcronymEdit" 
                  name="cityAcronymEdit"
                  type="text"
                  ref={refInputCityAcronym}
                  onChange={()=>{
                    setCityAcronymValue(refInputCityAcronym.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                <label htmlFor="cityNameEdit">Edit City Name</label>
                <input 
                  id="cityNameEdit" 
                  name="cityNameEdit"
                  type="text"
                  ref={refInputCityName}
                  onChange={()=>{
                    setCityNameValue(refInputCityName.current.value)
                  }} 
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <label htmlFor="cityCountryIdEdit">Change Country Id</label>
                <input 
                  id="cityCountryIdEdit" 
                  name="cityCountryIdEdit"
                  type="text"
                  ref={refInputCity_CountryId}
                  onChange={()=>{
                    setCity_CountryIdValue(refInputCity_CountryId.current.value)
                  }} 
                />
              </InputLabelContainer>
                
              <InputLabelContainer>
                  <button onClick={()=>{
                    triggerUpdateCity(cityIdToUpdate)
                  }}> Edit City </button >
              </InputLabelContainer>
            </LocationFormContainer>
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
