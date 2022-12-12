import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserAuthContext from '../context/auth';

import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';

function Routing() {
  const { authState, setAuthState } = useContext(UserAuthContext);
  console.log(authState)
  return (
    <Routes>
      <Route path="/" element={authState.isLogged ? <Home /> : <Navigate replace to="/login" />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Routing;
