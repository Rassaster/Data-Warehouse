import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Routing;
