import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserAuthContext from '../context/auth';

import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';

function Routing() {
  const { authState } = useContext(UserAuthContext);
  console.log("ROUTER:", authState)
  return (
    <Routes>
      <Route path="/" element={authState.isLoggedIn ? <Home /> : <Navigate replace to="/login" /> } />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={authState.isLoggedIn ? <Navigate replace to="/" />  : <Login /> } />
    </Routes>
  );
}

export default Routing;
