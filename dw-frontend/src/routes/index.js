import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserAuthContext from '../context/auth';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Contacts from '../pages/Contacts';
import Companies from '../pages/Companies';

import Users from '../pages/Users';
import NewUser from '../pages/Users/NewUser'
import AllUsers from '../pages/Users/AllUsers'

import Locations from '../pages/Locations';

function Routing() {
  const { authState } = useContext(UserAuthContext);
  console.log("ROUTER:", authState)
  return (
    <Routes>

      <Route path="/" element={authState.isLoggedIn ? <Home /> : <Navigate replace to="/login" /> } />
      <Route path="/login" element={authState.isLoggedIn ? <Navigate replace to="/" />  : <Login /> } />
      <Route path="/contacts" element={authState.isLoggedIn ? <Contacts /> : <Navigate replace to="/login" /> } />
      <Route path="/companies" element={authState.isLoggedIn ? <Companies /> : <Navigate replace to="/login" /> } />
      
      <Route 
        path="/users" 
        element= {authState.isLoggedIn && authState.isAdmin === "T" ? <Users /> : <Navigate replace to="/login" /> }
      />
      <Route 
        path="/users/new" 
        element= {authState.isLoggedIn && authState.isAdmin === "T" ? <NewUser /> : <Navigate replace to="/login" /> }
      />
      <Route 
        path="/users/viewAll" 
        element= {authState.isLoggedIn && authState.isAdmin === "T" ? <AllUsers /> : <Navigate replace to="/login" /> }
      />


      <Route path="/locations" element={authState.isLoggedIn ? <Locations /> : <Navigate replace to="/login" /> } />

    </Routes>
  );
}

export default Routing;
