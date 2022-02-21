import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from './pages/Menu';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Menu />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'));