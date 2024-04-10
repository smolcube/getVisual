import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ButtonIcon from './ButtonIcon';
import profileImg from '../assets/user.svg';

import defaultIMG from '../assets/img3.png';

export default function ServiceCard(props) {
  const location = useLocation();
  const isProfile = location.pathname === '/getVisual/users/rokaia'; 

  const [star, setStar] = useState(0.0);
  const name = "Service-name";

  const handleStarClick = () => {
    // Handle star click functionality
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      props.deletePackage(); // Call deletePackage function passed as prop
    }
  };

  return (
    <div className="service">
      <div className="service-image">
        <Link to={`${name}`}>
          <img src={props.servicesImg} alt="Service image" />
        </Link> 
      </div>

      {isProfile ? (
        <div className="service-details">
          <div className="service-details__links">
            <div className='service-details__links--user'>
              <img src={profileImg} alt="" />
              <h4 className="service-name">{name}</h4>
            </div>
            <div className="service-rating">
              <ButtonIcon 
                onClick={handleStarClick}
                ionicon="star-outline"
              />
              {star}
            </div>
          </div>
          <div className="service-description">
            {props.description}
          </div>
          <div className="service-price">{props.price} LYD
            <ButtonIcon
              ionicon="trash-outline"
              onClick={handleDelete} // Call handleDelete function on click
            />
          </div>
        </div>
      ) : (
        // Render other details if not in profile
        <div className="service-details">
          <div className="service-details__links">
            <div className='service-details__links--user'>
              <img src={profileImg} alt="" />
              <h4 className="service-name">{name}</h4>
            </div>
            <div className="service-rating">
              <ButtonIcon 
                onClick={handleStarClick}
                ionicon="star-outline"
              />
              {star}
            </div>
          </div>
          <div className="service-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
          <div className="service-price">20 ~ 80 LYD</div>
        </div>
      )}
    </div>
  );
}
