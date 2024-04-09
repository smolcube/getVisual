import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import ButtonIcon from './ButtonIcon';
import profileImg from '../assets/user.svg';


export default function ServiceCard(props) {

  const [star, setStar] = useState("0.0");

  const name ="Service-name"

  return (
    <div className="service">
      <div className="service-image">
      <Link to={`${name}`}>
        <img src={props.servicesImg} alt="Service image" />
      </Link>
      </div>

      <div className="service-details">
        <div className="service-details__links">
          <div className='service-details__links--user'>
        <img src={profileImg} alt="" />
        <h4 className="service-name">{name}</h4>
          </div>
        <div className="service-rating">
          <ButtonIcon 
            onClick={() => {setStar(star + 1.0)}}
            ionicon="star-outline"
          />
         {star}</div>
        </div>
  
        <div className="service-description">
          Horem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="service-price">30~80 LYD</div>
      </div>
    </div>
  );
};

