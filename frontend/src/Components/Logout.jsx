// components/LogoutButton.js

import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Send a POST request to log out the user
      await axios.post('/getVisual/auth/logout');
      
      // Clear localStorage items named 'currentUser' and 'Admin' if they exist
      if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
      }
      if (localStorage.getItem('Admin')) {
        localStorage.removeItem('Admin');
      }
      
      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      // Log any errors that occur during logout
      console.error('Logout failed:', error);
    }
  };

  // Render a button labeled "Logout" that triggers handleLogout when clicked
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
