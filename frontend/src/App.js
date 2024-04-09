import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/main.css';

import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPass from './Pages/ForgotPass';
import Logout from './Components/Logout';

import PostPackage from './Pages/PostPackage';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings.jsx';
import Package from './Pages/Package';
import PackageSlide from './Pages/PackageSlide'

import Hero from './Sections/Hero';
import About from './Sections/About';
import Services from './Sections/Services';
import CategoryDets from './Pages/CategoryDets';
import PackageDets from './Pages/PackageDets.jsx';
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

        <Route path="/getVisual/auth/logout" element={<Logout />} />
        
        <Route path="/getVisual/auth/forgot-password" element={<ForgotPass />} />
                

        <Route path="/getVisual/services/category-details/:categoryName" element={<CategoryDets />}/>
        <Route path="/getVisual/services/category-details/:categoryName/:name" element={<PackageDets />}/>

        <Route path="/getVisual/upload/users/:username/post-package" element={<PostPackage/>}/>

        <Route path="/getVisual/users/:username" element={<Profile />}/>
        <Route path="/getVisual/upload/users/:username/settings" element={<Settings />}/>



      {/* Protect the dashboard route using Auth component */}
        <Route
         path="/getVisual/dashboard/"
         element={<Auth element={Dashboard } />}
        />
        <Route path="/getVisual/dashboard/login" element={<AdminLogin />} />
        <Route path="/getVisual/dashboard/:state" element={<DashTables />} />
        <Route path="/getVisual/dashboard/:state/:id" element={<Package />} />
        <Route path="/getVisual/dashboard/:state/:id/image" element={<PackageSlide />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
