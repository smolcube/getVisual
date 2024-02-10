import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/main.css';

import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ResetPass from './Pages/ResetPass';
import ForgotPass from './Pages/ForgotPass';
import PostService from './Pages/PostService';

import Hero from './Sections/Hero';
import About from './Sections/About';
import Services from './Sections/Services';
import FAQs from './Sections/FAQs';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';


import AdminLogin from './Pages/AdminLogin';
import Dashboard from './Pages/Dashboard';
import DashTables from './Pages/DashTables';

import Auth from './Components/Auth'; 


function App() {
  return (
<Router>
      <Navbar/>
      <Routes>
        <Route
          path="/getVisual/*"
          element={
            <>
              <Hero />
              <About id='About'/>
              <Services id='Services'/>
              <FAQs id='FAQs'/>
              <Contact id='Contact'/>
            </>
          }
        />
        <Route path="/getVisual/login" element={<Login />} />
        <Route path="/getVisual/signup" element={<Register />} />
        
        <Route path="/getVisual/auth/forgot-password" element={<ForgotPass />} />
        <Route path="/getVisual/auth/forgot-password/reset-password" element={<ResetPass />} />
        
                
        <Route path="/getVisual/users/:username/post-service" element={<PostService />}/>
      {/*  <Route path="/getVisual/users/:username" element={<Profile />}/>
        <Route path="/getVisual/users/:username/settings" element={<Settings />}/>*/}

        <Route path="/getVisual/dashboard/login" element={<AdminLogin />} />
        <Route path="/getVisual/dashboard/main" element={<Dashboard />} />
        <Route path="/getVisual/dashboard/main/:state" element={<DashTables />} />

      {/* Protect the dashboard route using Auth component 
        <Route
         path="/getVisual/dashboard/main"
         element={<Auth element={Dashboard } />}
      />*/}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
