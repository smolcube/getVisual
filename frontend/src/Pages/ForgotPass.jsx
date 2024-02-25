import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icons // Media
import resetPassWide from '../assets/resetPass-wide.jpg';
import resetPassSmall from '../assets/resetPass-small.jpg';
import resetPassMid from '../assets/resetPass-mid.jpg';

// Pages // Components
import TextField from '../Components/TextField';
import newRequest from '../Utils/newRequest';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [classN, setClassN] = useState('');

  useEffect(() => {
    console.log("Class Name:", classN);
  }, [classN]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post('/auth/forgot-password', { email });
      const responseData = response.data;

      console.log("Response Data:", responseData);
      if (responseData.message === "عنوان البريد الإلكتروني غير موجود") {
        setMessage({ text: responseData.message, className: 'error' });
        setClassN("error");
      } else if (responseData.message === "الرجاء التحقق من بريدك الإلكتروني") {
        setMessage({ text: responseData.message, className: 'success' });
        setClassN("success");
      } else {
        setMessage({ text: "Error occurred. Please try again.", className: 'error' });
        setClassN("error");
      }

    } catch (error) {
      setMessage({ text: "Error occurred. Please try again.", className: 'error' });
      setClassN("error");
    }
  };


  return (
    <div className="reset">
      <div className="reset__container">
        <img
          className="reset__container--img"
          src={resetPassWide}
          srcSet={`${resetPassSmall} 600w, ${resetPassMid} 900w, ${resetPassWide} 1212w`}
          sizes="(max-width: 1212px) 100vw, 1212px"
          alt=""
        />

        <h1 className="reset__container--title">نسيت كلمة المرور</h1>

        <p className="reset__container--content">
          من فضلك أدخل بريدك الإلكتروني، ستصلك رسالة بالبريد الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك
        </p>

        <form 
          action="" 
          method="POST" 
          onSubmit={handleEmailSubmit} 
          className="reset__container--form">
          <div className="reset__container--form-feild input-field">
            <div className={`textField-box ${classN}`}>
              {/* EMAIL */}
              <TextField
                ionicon1="mail-outline"
                htmlFor="email"
                label="Email"
                type="text"
                id="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="form-messages">
              {message.text && 
                <div className={`form-messages ${message.className}`}>
                  {message.text}
                </div>}
              </div>
            </div>
          </div>
          <button className="pri-cta cta" type="submit">
            تأكيد الحساب
          </button>
          <br />
          <span className="span-mid">ليس لديك حسـاب؟</span>
          <br />
          <span className="span-small">
            <Link to="/getVisual/signup">انشـئ حساب</Link>
          </span>
        </form>
      </div>
    </div>
  );
}