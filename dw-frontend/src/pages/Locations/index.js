import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";
import api from '../../services/api';
import UserAuthContext from '../../context/auth';

import { FaTrashAlt, FaEdit, FaTimes, FaPlus} from 'react-icons/fa'
import { Container, Head, RegionsList, RegionItem, CountryItem, CityItem, ActionBtnsContainer} from "./styles";
import './styles.css'

const loggedOff = {isLoggedIn: false, token: '', isAdmin: ''}

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const ALL_REGIONS = "/regions/listAll";
const ALL_COUNTRIES = "/countries/listAll";
const ALL_CITIES = "/cities/listAll";
const COUNTRIES_IN_REGION = "/countries/regionId:";
const CITIES_IN_COUNTRY = "/cities/countryId:";
const CREATE_ = "/";
const UPDATE_ = "/";
const DELETE_ = "/";


function Locations() {
  // Declaration of Global Auth Context
  const { authState, setAuthState } = useContext(UserAuthContext);

  // Declaration of States:
  const [regionsList, setRegionsList] = useState([])
  const [regionId, setRegionId] = useState([])

  const [countriesList, setCountriesList] = useState([])
  const [countryId, setCountryId] = useState([])

  const [citiesList, setCitiesList] = useState([])

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
      console.log("REGIONS RESPONSE", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setRegionsList(response?.Result)
        console.log("REGIONS LIST", regionsList)
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
      console.log("COUNTRIES RESPONSE", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setCountriesList(response?.Result)
        console.log("COUNTRIES LIST", countriesList)
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
      console.log("CITIES RESPONSE", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setCitiesList(response.Result)
        console.log("CITIES LIST", citiesList)
      }
    })
  }


  useEffect(()=> {
    triggerViewAllRegions()
    triggerViewAllCountries()
    triggerViewAllCities()
    // triggerCountriesInRegion(1)
    // triggerCitiesInCountry(1)
  }, [])

  return (
    <Container>
      <Link to="/"> Home </Link>
      <Head>
        <h1>Locations</h1>
      </Head>
      <RegionsList>
        {regionsList.length > 0 ? 
            <> 
              <ActionBtnsContainer>
                <button className="region-Add-Region">
                  Add Region<FaPlus size={16} title="Add Country" />  
                </button>
              </ActionBtnsContainer>
              {regionsList.map((region, index) => {
                return (
                  <RegionItem key={`${region.region_name}${index}`}>
                    <h3>
                      {region.name_region} (Region Id: {region.id_region})
                      <ActionBtnsContainer>
                        <button className="region-Delete">
                          <FaTrashAlt size={16} title="Delete Region" />  
                        </button>
                        <button className="region-Edit">
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
    </Container>
  )
}

export default Locations;
