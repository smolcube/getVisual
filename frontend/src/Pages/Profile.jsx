import React from 'react';

import ButtonCTA from '../Components/ButtonCTA';
import ServiceCard from '../Components/ServiceCard';

const Profile = () => {
  return (
    <div className="profile">
      <div className="left-column">
        <div className="profile-image">
          <img src="https://i.imgur.com/tSzNIJH.jpeg" alt="Profile" />
        </div>
        <span className="username">@Username</span>
        <span className="faded">Joined on Feb 2023</span>
        <hr />
        <div className="extra-info">
          <div className="icon">DESCRIPTION</div>
          <p className="content">
            Morem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <ButtonCTA 
          class='pri-cta cta'
          name='Contact me'
        />
      </div>
      <div className="right-column">
        <div className="services">
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
