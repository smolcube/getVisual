import React from "react";
import { Link } from 'react-router-dom';

// Files // Modules
import Register from '../Pages/Register';

// Components
import ButtonCTA from '../Components/ButtonCTA';

// get current user's info
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const isLoggedIn = !!currentUser; // Check if a user is logged in

export default function Hero() {
  return (
    <header className="hero">
    <div className="hero-logo"> {/* This div contains the background image and the text */}
      <div className="hero-content">
        <h1>اطلق العنان لإمكانياتك</h1>
        <p>
        <span className="highlighted">getVisual</span> هل أنت مصمم جرافيك موهوب؟ انضم الى
        <br />
        وأضف نجمة ابداعك إلى سماء التصميم ! توفر لك هذه
        المنصة فرصة رائعة لعرض  مهارتك وفنك، 
        و ايضا توفر الفرصة لأصحاب الأعمال العثور على مصممين محترفين 
        لمشارعهم. لا تدع هذه الفرصة تفوتك 
        </p>

  <div className="cta-container">
  {!isLoggedIn ? (
    <Link to='/getVisual/signup' >
    <ButtonCTA
      class='pri-cta cta'
      function={Register}
      name='انضم لنا'
    />
    </Link>
  ) : (
    <Link to={`/getVisual/users/${currentUser.username}/post-service`}>
    <ButtonCTA
      class='pri-cta cta'
      name='نشر خدمة'
    />
    </Link>
    )}
    </div>
    </div>
    </div>
    </header>
  );
}
