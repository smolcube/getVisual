import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/main.css';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';

function App() {
  return (

    <>
    <Router>
      <Routes>
        <Route path="/getVisual/login" element={<Login />} />
        <Route path="/getVisual/signup" element={<Register />} />
      </Routes>
    </Router>
    <Contact/>
    <Footer/>
    </>
  );
}

export default App;
