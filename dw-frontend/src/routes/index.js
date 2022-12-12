import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserAuthContext from '../context/auth';

import Home from '../pages/Home';
import Users from '../pages/Users';
import Login from '../pages/Login';

function Routing() {
  const { authState } = useContext(UserAuthContext);
  console.log("ROUTER:", authState)
  return (
    <Routes>
      <Route path="/" element={authState.isLoggedIn ? <Home /> : <Navigate replace to="/login" /> } />
      <Route 
        path="/users" 
        element= {authState.isLoggedIn ? <Users /> : <Navigate replace to="/login" /> }/>
      <Route path="/login" element={authState.isLoggedIn ? <Navigate replace to="/" />  : <Login /> } />
    </Routes>
  );
}

export default Routing;
