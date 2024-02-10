import React from "react";
import { NavLink } from "react-router-dom";

import services from "../data/services";

export default function Services() {

    return (
        <section id='Services' className="service-container">
          <div className="service-intro">
            <h1>الخدمات</h1>
            <p>ترغب في شيء معين؟ لدينا تشكيله واسعه لك</p>
          </div>
          {services.map((service, index) => (
            <div className="service-item" key={index}>
            <NavLink
                key={index}
                to={`/getVisual/services/category-details/${service.alt}`} >
              <img src={service.icon} alt={`صورة ${service.name}`} />
              <h4>{service.name}</h4>
            </NavLink>
            </div>
          ))}
        </section>
      );
}