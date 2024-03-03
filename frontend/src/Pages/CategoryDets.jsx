import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import services from "../data/services";
import ServiceCard from "../Components/ServiceCard";

export default function CategoryDets() {
  const { categoryName } = useParams();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Function to check if the screen is small
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 601); // Adjust the threshold as needed
  };

  // Run checkScreenSize on component mount and resize
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Filter services based on the categoryName
  const filteredServices = services.filter(service => service.alt === categoryName);

  return (
    <div className="categoryDets">
      <div className="categoryDets__left-column">
        {/* Map through filtered services and display their descriptions */}
        {filteredServices.map((service, index) => (

          <div className="categoryDets__left-column--card" key={index}>
            {isSmallScreen && service.phone && 
              <img src={service.phone} alt="" />
            }
            {/* Render the regular image if not a small screen or if "phone" key is not available */}
            {!isSmallScreen &&
               <img 
                src={service.img} 
                alt="" 
                className="image"/>
            }
            <div>
            <div className="paragraph">
            <p className="catgeoryDesc">
              {service.desc}
            </p>
            </div>

            <div className="tag-item">
              
            </div>
            </div>
          </div>

        ))}
      </div>

      <div className="categoryDets__right-column">
        <div className="categoryDets__right-column--services">
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </div>
    </div>
  );
}
