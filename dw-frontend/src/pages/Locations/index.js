import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";
import api from '../../services/api';
import UserAuthContext from '../../context/auth';

import { Container, Head, RegionsList, RegionItem } from "./styles";
import './styles.css'

const loggedOff = {isLoggedIn: false, token: '', isAdmin: ''}

// Global Constants for API Request:
const BASE_URL = "http://localhost:3008/dataWarehouse";
const ALL_REGIONS = "/regions/listAll";
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
  const [countryId, setCountryId] = useState([])

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
      console.log("REGIONS", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        setRegionsList(response.Result)
      }
    })
  }

   // Declaration of Request Options: GET Countries in a RegionId
  const viewAllCountriesInRegionRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const viewAllCountriesInRegionRequestInfo = {
    method: 'GET',
    headers: viewAllCountriesInRegionRequestHeaders,
    redirect: 'follow'
  }
  const triggerCountriesInRegion = (regionId) => {
    const viewAllCountriesInRegionResponse = api(`${BASE_URL}${COUNTRIES_IN_REGION}${regionId}`, viewAllCountriesInRegionRequestInfo);
    viewAllCountriesInRegionResponse.then(response => {
      console.log("COUNTRIES:", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        return response.Result
      }
    })
  }

  // Declaration of Request Options: GET Cities in a CountryId
  const viewAllCitiesInCountryRequestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authState.token}`
  };
  const viewAllCitiesInCountryRequestInfo = {
    method: 'GET',
    headers: viewAllCitiesInCountryRequestHeaders,
    redirect: 'follow'
  }
  const triggerCitiesInCountry = (countryId) => {
    const viewAllCitiesInCountryResponse = api(`${BASE_URL}${CITIES_IN_COUNTRY}${countryId}`, viewAllCitiesInCountryRequestInfo);
    viewAllCitiesInCountryResponse.then(response => {
      console.log("CITIES:", response)
      if (response.Status === 403) {
        setAuthState(loggedOff)
      }
      if (response.Status === 200) {
        return response.Result
      }
    })
  }



  useEffect(()=> {
    triggerViewAllRegions()
    triggerCountriesInRegion(1)
    triggerCitiesInCountry(1)
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
              {regionsList.map((region, index) => {
                return (                  <RegionItem key={`${region.region_name}${index}`}>
                    <h4>{region.name_region}</h4>
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
