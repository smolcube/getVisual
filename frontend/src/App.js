import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/main.css';

import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPass from './Pages/ForgotPass';

import PostPackage from './Pages/PostPackage';
import Profile from './Pages/Profile';
import Package from './Pages/Package';
import PackageSlide from './Pages/PackageSlide.jsx'

import Hero from './Sections/Hero';
import About from './Sections/About';
import Services from './Sections/Services';
import CategoryDets from './Pages/CategoryDets';
import FAQs from './Sections/FAQs';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';


import Auth from './Components/Auth'; 
import AdminLogin from './Pages/AdminLogin';
import Dashboard from './Pages/Dashboard';
import DashTables from './Pages/DashTables';



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
                

        <Route path="/getVisual/services/category-details/:categoryName" element={<CategoryDets />}/>
        
        <Route path="/getVisual/upload/users/:username/post-package" element={<PostPackage/>}/>

        <Route path="/getVisual/users/:username" element={<Profile />}/>
        {/*<Route path="/getVisual/users/:username/settings" element={<Settings />}/>*/}

        <Route path="/getVisual/dashboard/login" element={<AdminLogin />} />
        <Route path="/getVisual/dashboard/main" element={<Dashboard />} />
        <Route path="/getVisual/dashboard/main/:state" element={<DashTables />} />
        <Route path="/getVisual/dashboard/main/pending/:id" element={<Package />} />
        <Route path="/getVisual/dashboard/main/pending/:id/image" element={<PackageSlide />} />

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
