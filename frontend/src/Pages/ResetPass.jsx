import React, { useState } from 'react'

// Pages // Components
import TextField from '../Components/TextField'
import newRequest from '../Utils/newRequest';

export default function ResetPass() {
  const [ email, setEmail ] = useState("");

  // handle input
  const handleChange = (e)=> {
    
  }

  return (
  <div className="reset">
    <div className='reset__container'>
      <img className='reset__container--img'
        src={process.env.PUBLIC_URL +'../assets/resetPass-wide.jpg'}
        srcSet={`${process.env.PUBLIC_URL +'../assets/resetPass-small.jpg'}600w, ${process.env.PUBLIC_URL +'../assets/resetPass-mid.jpg'} 900w, ${process.env.PUBLIC_URL +'../assets/resetPass-wide.jpg'} 1212w`}
        sizes="(max-width: 1212px) 100vw, 1212px"
        alt=""
      />

      <h1 className='reset__container--title'>Reset Password</h1>

      <p className='reset__container--content'>please enter a new password.</p>
        
      <form action=""
            method="post"
            className='reset__container--form'>
      z{/* PASSWORD */}
      <div className='reset__container--form-feild input-field'>
      <TextField
          type="password"
          id="password"
          label="Password"
          placeholder="Enter New Password"
        />       
        <br /> 
      <TextField
        type="password"
        id="rePassword"
        label="Password"
        placeholder="Enter New Password again"
      />
      </div>
      <button className='pri-cta cta' type="submit">Reset Password</button>
          <br />
        </form>
      
    </div>
  </div>
  )
}
