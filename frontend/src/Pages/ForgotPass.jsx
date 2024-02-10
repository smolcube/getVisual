import React from 'react'


// Pages // Components
import TextField from '../Components/TextField'

export default function ForgotPass() {
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

      <p className='reset__container--content'>please enter your email, you will receive an email to reset your password</p>
        
      <form action=""
            method="post"
            className='reset__container--form'>

      <div className='reset__container--form-feild input-field'>
      <div className="textField-box">
      {/* EMAIL */}
        <TextField
          ionicon1="mail-outline"
          htmlFor="email"
          label="Email"
          type="text"
          id="email"
          placeholder="Email"
        />
      </div>
      </div>
      <button className='pri-cta cta' type="submit">Confirm email</button>
          <br />
          <span className='span-mid'>Don't have an account?</span>
          <br />
          <span className='span-small'><a href="/getVisual/signup">Sign up here.</a></span>
        </form>
      
    </div>
  </div>
  )
}
