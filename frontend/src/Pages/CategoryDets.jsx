import React from "react";
import { useParams } from "react-router-dom";

import services from "../data/services";

export default function CategoryDets (){
   const {categoryName} = useParams();
    return(
        <div className="categoryDets">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
        <h1>{categoryName}</h1>
          {services.map((service, index) => (
          <p>
            {service.desc}
          </p>
          ))}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
)}