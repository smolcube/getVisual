import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

// images
import img from '../assets/logoimg1.png';
import img1 from '../assets/logoimg1-1.png';
import img2 from '../assets/logoimg1-2.png';
import img3 from '../assets/logoimg1-3.png';

// Components
import ButtonIcon from '../Components/ButtonIcon';

export default function PackageSlide() {
    // Sample images for demonstration purposes
    const images = [img, img1, img2, img3];
  
    const [scrollIndex, setScroll] = useState(0);
  
    const nextSlide = () => {
        if (scrollIndex !== images.length - 1) {
            setScroll(scrollIndex + 1);
        } else {
            setScroll(0);
        }
    };
    
    const previousSlide = () => {
        if (scrollIndex !== 0) {
            setScroll(scrollIndex - 1);
        } else {
            setScroll(images.length - 1);
        }
    };
  
    return (
      <div className="packageSlide">
        <div className="packageSlide__container">
          <div className='packageSlide__container--slider'>
            <ButtonIcon
              className="button-prev"  
              onClick={previousSlide}
              ionicon='arrow-back-outline'
            />
            <img 
              className='shadow'
              src={images[scrollIndex]}
              alt="" 
            />
            <ButtonIcon
              className="button-next"  
              onClick={nextSlide}
              ionicon='arrow-forward-outline'
            />
          </div>
          <div className='packageSlide__container--images'>
            {images.map((image, index) => (
              <img 
                onClick={() => setScroll(index)}
                key={index}
                className={`shadow ${index === scrollIndex ? 'active' : ''}`}
                src={image}
                alt="" 
              />
            ))}
          </div>
        </div>
      </div>
    );
}
