// components/LogoutButton.js

import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post('/getVisual/auth/logout');
      // Clear localStorage item on the client-side
      localStorage.removeItem('currentUser');
      // Redirect or perform any other action upon successful logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
