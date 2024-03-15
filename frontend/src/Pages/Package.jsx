import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// images
import img from '../assets/logoimg1.png';

// components // modules
import ButtonIcon from '../Components/ButtonIcon';
import newRequest from '../Utils/newRequest';

export default function Package() {
  const { id, state } = useParams();
  // Fetching data
  const [packageItem, setPackageItem] = useState([]);

  useEffect(() => {
    // Fetch package data from backend API
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/dashboard/${state}/${id}`);
        setPackageItem(response.data.packageItem);
        console.log("packageItem fetch is done!!!");
      } catch (error) {
        console.error('Error fetching packageItem:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="package">
      <h3>تفاصــيل الخدمة</h3>
      <div className="package__container">
        {packageItem.map((packageItemDets) => (
          <React.Fragment key={packageItemDets.id}>
            <div className="package__container--image">
              <Link to={`/getVisual/dashboard/main/pending/${id}/image`}>
                <img className="shadow" src={img} alt="Package Image" />
              </Link>
            </div>
            <div className="package__container--info">
              <p>{packageItemDets.user.userame}</p>
              <p>
                {`اسم الخدمة: ${packageItemDets.name}`}
              </p>
              <p>
                {`الوصف: ${packageItemDets.desc}`} 
              </p>
              <p>
                {`التصنيف: ${packageItemDets.category}`} 
              </p>
              <p>
                {`السعر: ${packageItemDets.price}`} 
              </p>
              <p>
                {`التاريخ /الوقت: ${packageItemDets.createdAt}`} 
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}