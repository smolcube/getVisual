import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Pages // components
import newRequest from '../Utils/newRequest';

export default function AdminLogin() {
    
const [input, setInput] = useState ({
    email: '',
    password: '',
    errors: null,
})

const handleChange = (e)=> {
    const {name, value} = e.target;
    setInput(prevInput => {
      return {
      ...prevInput,
      [name] : value
    }
  })
}

const navigate = useNavigate()

const handleSubmit= async (e) =>{
  e.preventDefault();
  console.log('Email:', input.email);
  console.log('Password:', input.password);
  try {
  const res = 
  await newRequest.post("/dashboard/login",
  {
    email : input.email,
    password : input.password,
  });

 // const { token } = res.data;
  const expiresAt = Date.now() + (12 * 60 * 60 * 1000);

  // Update res.data with the new expiresAt value
  res.data.expiresAt = expiresAt;
  // Storing user data along with expiration time in local storage
  console.log("Expires at:", new Date(expiresAt));
  localStorage.setItem(
    "Admin",
    JSON.stringify({ ...res.data, expiresAt })
  );
  navigate("/getVisual/dashboard/")

  // Recieving error from the console to show on UI
  } catch (error) { 
    if ( error.response && error.response.data ) {
      setInput((prevInput) => ({
        ...prevInput,
        errors: error.response.data.message,
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        errors:"Something has went wrong, refresh page and try again."
      }))
    }
  }
};

  return (
    <div className='adminLogin'>
    <h1>Admin's Log</h1>
      <form 
        className="login-form" 
        action="/dashboard/login"
        method="POST"
        onSubmit={handleSubmit}
        >
        <div className="login-form__input">
          <label htmlFor="username" className="login-form__label">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className="login-form__input-field"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <div className="login-form__input">
          <label htmlFor="password" className="login-form__label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-form__input-field"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="login-form__submit-btn">Login</button>
      </form>
      <span>
          {input.errors}
      </span>
      </div>
    );
  };

