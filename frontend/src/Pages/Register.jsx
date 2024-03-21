
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

// Pages // components
import TextField from '../Components/TextField';
import Radio from '../Components/Radio.jsx';
import ButtonCTA from '../Components/ButtonCTA';
import ButtonIcon from '../Components/ButtonIcon';

import newRequest from '../Utils/newRequest.js';


export default function Register() {
// التعامل مع حالة الادخال
const [input, setInput] = useState ({
  username: '',
  email: '',
  password: '',
  accType: '',
  errors: null,
})

// اخفاء و اظهار كلمة المرور
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
}

// loging in
const navigate = useNavigate()

const handleSubmit= async (e) =>{
  e.preventDefault();
  console.log(input);
  try {
    const res = 
    await newRequest.post("/signup",
    {
      username : input.username,
      email : input.email,
      password : input.password,
      accType: input.accType,
    });
  
    const expiresAt = Date.now() + (2 * 60 * 1000);
  
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
        <h1>انشـئ حساب</h1>
        <br />
      <form
         className='container__column1--form'
         action="/signup" 
         method="POST"
         onSubmit={handleSubmit}
      >

      {/* USERNAME */}
      <div className="textField-box">
      <TextField
        ionicon1="person-outline"
        htmlFor="username"
        label="Username"
        type="text"
        id="username" //name
        placeholder="الاسم"
        value={input.username}
        onChange={handleChange}
      />
      </div>

      {/* EMAIL */}
      <div className="textField-box">
      <TextField
        ionicon1="mail-outline"
        htmlFor="email"
        label="Email"
        type="text"
        id="email" //name
        placeholder="البريد الإلكتروني"
        value={input.email}
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
        <div className="form-messages">

        </div>

      {/* ACCOUNT TYPE RADIO BUTTONS */}
        <div className='form-radio'>
            <label className='visually-hidden'>Account Type</label>
            <div className='radio-item'>
              <Radio
                id="designer"
                name="accType"
                value="designer"
                onChange={handleChange}
                checked={input.accType === 'designer'}
                htmlFor="designer"
                label='مُـــصمم'
              />
              </div>
              <div className='radio-item'>
              <Radio
                id="customer"
                name="accType"
                value="customer"
                onChange={handleChange}
                checked={input.accType === 'customer'}
                htmlFor="customer"
                label='زبـــون'
              />
              </div>
          </div>
               
        <ButtonCTA
        class="form-btn pri-cta cta"
        type="submit"
        name="أنشــئ حساب"
        />
      </form>
      <span className='span-mid'>
        لديــك حساب؟
      </span> <br />
      <span className='span-small'>
        <a href="/getVisual/login">.ســجّـل الدخول</a>
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
  );
}