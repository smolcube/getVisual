import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// images
import img from '../assets/logoimg1.png';

// components // modules
import newRequest from '../Utils/newRequest';

export default function Package() {
  const { id, state } = useParams();
  const [packageItem, setPackageItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/dashboard/${state}/${id}`);
        setPackageItem(response.data.packageItem);
      } catch (error) {
        console.error('Error fetching packageItem:', error);
      }
    };

    fetchData();
  }, [id, state]);

  return (
    <div className="package">
      <h3>تفاصيل الخدمة</h3>
      <div className="package__container">
        <div className="package__container--image">
          <Link to={`/getVisual/dashboard/pending/${id}/image`}>
            <img className="shadow" src={img} alt="Package" />
          </Link>
        </div>
        <div className="package__container--info">
          <p>{packageItem.images && packageItem.images[0]}</p>
          <p>{`اسم المستخدم: ${packageItem.user && packageItem.user.username}`}</p>
          <p>{`اسم الخدمة: ${packageItem.name}`}</p>
          <p>{`الوصف: ${packageItem.desc}`}</p>
          <p>{`التصنيف: ${packageItem.category}`}</p>
          <p>{`السعر: ${packageItem.price}`}</p>
          <p>{`التاريخ /الوقت: ${packageItem.createdAt}`}</p>
        </div>
      </div>
    </div>
  );
}
