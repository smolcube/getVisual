
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Pages // components
import newRequest from '../Utils/newRequest';
import TextField from '../Components/TextField';
import ButtonIcon from '../Components/ButtonIcon'; 
import ButtonCTA from '../Components/ButtonCTA';

export default function Login() {
// to handle input state
  const [input, setInput] = useState ({
    identifier: '',
    password: '',
    errors: null,
})

// show or hide password
const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => setShowPassword(!showPassword);


// to handle the input content  
const handleChange = (e)=> {
    const {name, value} = e.target;
    setInput(prevInput => {
      return {
      ...prevInput,
      [name] : value
    }
  })
  console.log(value);
}

// loging in
const navigate = useNavigate()

const handleSubmit= async (e) =>{
  e.preventDefault();
  try {
  const res = 
  await newRequest.post("/login",
  {
    identifier : input.identifier,
    password : input.password,
  });

  const expiresAt = Date.now() + (60 * 1000);

  // Update res.data with the new expiresAt value
  res.data.expiresAt = expiresAt;
  // Storing user data along with expiration time in local storage
  console.log("Expires at:", new Date(expiresAt));
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ ...res.data, expiresAt })
  );
  navigate("/getVisual")

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
    <div className='container'>
      <div className="container__column1">
        <h1 className='style-title'>مرحـبا مجددا</h1>
        <h1 className="container__column1--title">تسجيل الدخول</h1>
      <form
         className='container__column1--form'
         action="/login" 
         method="POST"
         onSubmit={handleSubmit}
         >

        {/* IDENTIFIER */}
        <div className="textField-box">
          <TextField
            ionicon1="person-outline"
            htmlFor="identifier"
            label="Email or Username"
            type="text"
            id="identifier" //name
            placeholder="البريد الإلكتروني او الاسم"
            value={input.identifier}
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD */}
        <div className="textField-box">
          <TextField
            ionicon1="key-outline"
            htmlFor="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password" //name
            placeholder="كلمة المرور"
            value={input.password}
            onChange={handleChange}
          />
        <ButtonIcon
          id="show-pass"
          onClick={togglePasswordVisibility}
          ionicon="eye-outline"
        />
        </div>
        
        {/* RENDERING ERROR MESSAGE */}
        <div className="form-messages">
        <span>
          {input.errors}
        </span>
        <a 
          className="forgot-message"
          href='/getVisual/auth/forgot-password'>
          نسيت كلمة المرور؟
        </a>
        </div>

        <div className='form-btn'>
        <ButtonCTA
        class="pri-cta cta"
        type="submit"
        name="ســجّـل الدخول"
        />
        </div>
      </form>
      <span className='span-mid'>
        ليس لديك حسـاب؟
      </span>
      <br />
      <span className='span-small'>
        <a href="/getVisual/signup">.انشـئ حساب</a>
      </span>
      </div>

      <div className="container__column2">
      <img
        src={process.env.PUBLIC_URL + '../assets/createAccount-wide.jpg'}
        srcSet={`${process.env.PUBLIC_URL + '../assets/createAccount-small.jpg'} 600w, ${process.env.PUBLIC_URL + '../assets/createAccount-mid.jpg'} 900w, ${process.env.PUBLIC_URL + '../assets/createAccount-wide.jpg'} 1212w`}
        sizes="(max-width: 1212px) 100vw, 1212px"
        alt=""
      />
      </div>

    </div>  
  )}