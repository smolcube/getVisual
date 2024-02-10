import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ element: Element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('Admin');

  useEffect(() => {
    if (!token) {
      console.log('Redirecting to /getVisual...');
      navigate('/getVisual');
    }
  }, [navigate, token]);

  if (!token) {
    return null;
  }

  console.log('Token present, rendering the protected route.');
  return <Element />;
};

export default Auth;


/*import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const Auth = ({ element: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuth ? (
          <Component />
        ) : (
          <Navigate to="/getVisual" replace />
        )
      }
    />
  );
};

export default Auth;
*/