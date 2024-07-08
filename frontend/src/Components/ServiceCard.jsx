import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

import ButtonIcon from './ButtonIcon';
import profileImg from '../assets/user.svg';
import defaultIMG from '../assets/img3.png';

export default function ServiceCard(props) {
  const location = useLocation();
  const isProfile = location.pathname === '/getVisual/users/rokaia';

  const [star, setStar] = useState(0.0);
  const [imageFilenames, setImageFilenames] = useState([]);

  const name = "Service-name";

  const handleStarClick = () => {
    // Handle star click functionality
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      props.deletePackage(); // Call deletePackage function passed as prop
    }
  };

  useEffect(() => {
    const fetchImageFilenames = async () => {
      try {
        const response = await axios.get('/images'); // Assuming your backend server is running on the same host
        setImageFilenames(response.data);
      } catch (error) {
        console.error('Error fetching image filenames:', error);
      }
    };

    fetchImageFilenames();
  }, []);

  return (
    <div className="service">
      <div className="service-image">
        <Link to={`${name}`}>
          {/* Use the first image filename from the fetched list or a default image */}
          <img src={imageFilenames.length > 0 ? `/uploads/${imageFilenames[0]}` : defaultIMG} alt="Service image" />
        </Link>
      </div>

      {isProfile ? (
        <div className="service-details">
          <div className="service-details__links">
            <div className='service-details__links--user'>
              <img src={profileImg} alt="" />
              <h4 className="service-name">{props.name}</h4>
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
