import React, { useState, useEffect } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link, useLocation } from 'react-router-dom';

// Icons // Media
import small from '../assets/nav-logo-small.svg';
import wide from '../assets/nav-logo-wide.svg';


// Pages // components
import Login from '../Pages/Login';
import ButtonCTA from "./ButtonCTA";
import SearchBanner from "./SearchBanner";
import UserMenu from './UserMenu';


export default function Navbar() {
  const location = useLocation();
  const isRootRoute = location.pathname === '/getVisual';
  const isDash = location.pathname === '/getVisual/dashboard/login' || "/getVisual/dashboard/main" || "/getVisual/dashboard/main/pending"|| "/getVisual/dashboard/main/approved"|| "/getVisual/dashboard/main/rejected" ;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = !!currentUser; // Check if a user is logged in

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  // Side Menu
  const [isNavbarHidden, setIsNavbarHidden] = useState(true);
  const toggleVisibility = () => {
    setIsNavbarHidden(!isNavbarHidden);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 601) {
        // Set visibility to true for larger screens
        setIsNavbarHidden(false);
      } else {
        setIsNavbarHidden(true);
      }
    };
  
    handleResize(); // Set initial visibility based on window width
  
    window.addEventListener('resize', handleResize); // Add event listener for window resize
  
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on component unmount
    };
  }, []);

  // User Menu
  const [userMenu, setUserMenu] = useState(false);
  const toggleUserMenu = () => {
    setUserMenu(!userMenu);
  };

  return (
      <nav className="navbar">
      <a href='/getVisual'>
        <img
        src={wide}
        srcSet={`${small} 600w, ${wide} 1150w`}
        sizes='(max-width: 1150px) 100vw, 1150px'
        alt='Logo'
        />
      </a>

        <ul 
          id="navbar"
          className={`navbar__list ${isNavbarHidden ? 'visually-hidden' : ''}`}
          >
      <li>
      {isRootRoute ? (
        <ScrollLink
          to='About'
          spy={true}
          smooth={true}
          offset={-10}
          duration={500}
        >
        من نحن
        </ScrollLink>
      ) : (
        <Link to="/getVisual#About">من نحن</Link>
      )}
      </li>

      <li>
      {isRootRoute ? (
        <ScrollLink
          to='Services'
          spy={true}
          smooth={true}
          offset={-40} 
          duration={500}
        >
        خدمات
        </ScrollLink>
      ) : (
        <Link to="/getVisual#Services">خدمات</Link>
      )}
      </li>

      <li>
      {isRootRoute ? (
        <ScrollLink
          to='FAQs'
          spy={true}
          smooth={true}
          offset={0} 
          duration={500}
        >
        الاسئلة
        </ScrollLink>
      ) : (
        <Link to="/getVisual#FAQs">الاسئلة</Link>
      )}
      </li>

      <li>
      {isRootRoute ? (
        <ScrollLink
          to='Contact'
          spy={true}
          smooth={true}
          offset={-40} 
          duration={500}
        >
        تواصل معنا
        </ScrollLink>
      ) : (
        <Link to="/getVisual#Contact">تواصل معنا</Link>
      )}
      </li>

      <li className='opt'>  
      {isLoggedIn ? (
      <button className='sec-cta cta'
        //onClick={Logout}
      >
      خروج
      </button>
      ) : (
      <button className='sec-cta cta'>
        <Link to='getVisual/login'>دخول</Link>
      </button>
      )}
      </li>     
      </ul>

      <div className="navbar__buttons">
        {isLoggedIn ? ( // If a user is logged in
        <div className='user-info'>
        <button
          className='user icn-btn'
          onClick={toggleUserMenu}
        >
          <img src={process.env.PUBLIC_URL + '../assets/user.svg'} alt="" />
          {userMenu && <UserMenu />}
        </button>
          <span className='span-small'>{currentUser.username}</span>
        </div>
        ) : (
          !isDash && ( // Only show login button if not in dashboard
            <Link to='/getVisual/login'>
              <ButtonCTA
                class='sec-cta cta'
                function={Login}
                name='تسجيل الدخول'
              />
            </Link>
          )
        )}
          <SearchBanner/>

        <button
          className='navbar__buttons--menu icn-btn'
          onClick={toggleVisibility}>
          <ion-icon name={isNavbarHidden ? 'menu-outline' : 'arrow-forward-outline'}></ion-icon>
        </button>
      </div>
      </nav>
  );
};
