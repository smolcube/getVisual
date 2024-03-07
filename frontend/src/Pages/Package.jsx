import React from 'react';
import { Link, useParams } from 'react-router-dom';

// images
import img from '../assets/logoimg1.png';

// components
import ButtonIcon from '../Components/ButtonIcon';

export default function Package() {
  const { id } = useParams();

  return (
    <div className="package">
        <h3>تفاصــيل  الخدمة</h3>
      <div className="package__container">
        <div className="package__container--image">
        <Link to={`/getVisual/dashboard/main/pending/${id}/image`}>
          <img 
            className='shadow'
            src={img} alt="Package Image" 
          />
        </Link>
        </div>
        <div className="package__container--info">
          <p>@username</p>
          <p>اسم الخدمة: تصميم لوقو</p>
          <p>الوصف: ذو طابع هندسي </p>
          <p>التصنيف: تصميم شعار</p>
          <p>السعر: 80 دينار</p>
          <p>
            التاريخ /الوقت: 15 يناير 2024 / 20:13
          </p>
        </div>
        </div>
    </div>
  );
}
