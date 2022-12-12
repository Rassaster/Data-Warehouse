import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserAuthContext from '../context/auth';

import Home from '../pages/Home';
import Contacts from '../pages/Contacts';
import Companies from '../pages/Companies';
import Users from '../pages/Users';
import Login from '../pages/Login';

function Routing() {
  const { authState } = useContext(UserAuthContext);
  console.log("ROUTER:", authState)
  return (
    <Routes>
      <Route path="/" element={authState.isLoggedIn ? <Home /> : <Navigate replace to="/login" /> } />
      <Route path="/contacts" element={authState.isLoggedIn ? <Contacts /> : <Navigate replace to="/login" /> } />
      <Route path="/companies" element={authState.isLoggedIn ? <Companies /> : <Navigate replace to="/login" /> } />
      <Route 
        path="/users" 
        element= {authState.isLoggedIn && authState.isAdmin === "T" ? <Users /> : <Navigate replace to="/login" /> }/>
      <Route path="/login" element={authState.isLoggedIn ? <Navigate replace to="/" />  : <Login /> } />
    </Routes>
  );
}

export default Routing;
