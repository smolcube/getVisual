import React from 'react';

import ButtonCTA from '../Components/ButtonCTA';
import ServiceCard from '../Components/ServiceCard';

//images 
import user from '../assets/user.svg';
import servicesImg2 from '../assets/logoimg1.png';
import servicesImg3 from '../assets/logoimg2.png';
import servicesImg4 from '../assets/logoimg3.png';

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const username = currentUser?.username;

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__left-column">

          <img
            className='profile__image'
            src={user} alt="Profile" 
          />

        <span className="profile__username">@{currentUser ? currentUser.username : ""}</span>
        <span className="profile__joined-on faded">انضم في فبراير 2023</span>
        
        <div className="profile__extra-info">
          <p className="content">الوصف</p>
          <p className="profile__content">
            مرحبــا انا مصمم جرافيكس مختص بتصميم الشعارات.
          </p>
        </div>
        <ButtonCTA 
          class='pri-cta cta'
          name='تواصل معي'
        />
      </div>
      <div className="profile__right-column">
        <div className="profile__right-column--services">
          <ServiceCard 
            servicesImg={servicesImg2}
          />
          <ServiceCard 
            servicesImg={servicesImg3}
          />
          <ServiceCard 
            servicesImg={servicesImg4}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
