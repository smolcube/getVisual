import React from 'react';
import { Link } from 'react-router-dom';

import profileImg from '../assets/user.svg';
import servicesImg from '../assets/printImg.jpg';

export default function ServiceCard() {
  const name ="Service name"
  return (
    <div className="service">
      <div className="service-image">
      <Link to={`getVisual/${name}`}>
        <img src={servicesImg} alt="Service image" />
      </Link>
      </div>

      <div className="service-details">
          <Link to={`getVisual/${name}`}>
        <div className="service-details__links">
          <div>
        <img src={profileImg} alt="" />
        <h4 className="service-name">{name}</h4>
          </div>
        <div className="service-rating">⭐ 3.5</div>
        </div>
          </Link>
  
        <div className="service-description">
          Horem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="service-price">30~80 LYD</div>
      </div>
    </div>
  );
};

