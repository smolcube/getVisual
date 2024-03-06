import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

import ButtonIcon from '../Components/ButtonIcon';


// Sample data representing pending posts
const pendingPosts = [
  {
    id: 1,
    title: 'عنوان المنشور 1',
    username: '@user1',
  },
  {
    id: 2,
    title: 'عنوان المنشور 2',
    username: '@user2',
  },
  {
    id: 3,
    title: 'عنوان المنشور 3',
    username: '@user3',
  },
];

export default function DashTables() {
  const { state } = useParams();
  
  // Translate state based on its value
  let translatedState;
  if (state === "Approved") {
    translatedState = "المقبولة";
  } else if (state === "Rejected"){
    translatedState = "المرفوضة";
  } else {
    translatedState = "المعلقة";
  }

  const location = useLocation();
  const isPending = location.pathname === '/getVisual/dashboard/main/pending';


  return (
    <div className="posts-container">
      <div className="posts-container__table">
      <div className="posts-container__table--title">
        <h1> المنشورات {translatedState}</h1>
        <p>سِــجل التفاصيل</p>
      </div>
        <div className="posts-container__table--wrapper">

        {pendingPosts.map(post => (
          <>
            <div className="posts-container__table--column1">
              {post.username}
            </div>
            <div className="posts-container__table--column2">
              <Link to={`/getVisual/dashboard/main/:${post.name}`}>
              {post.title}
              </Link>
            </div>
            {isPending ? (
            <div className="posts-container__table--column3">
              <ButtonIcon
                id='acceptBtn'
                //onclick = {}
                ionicon="checkmark-circle-outline"
              />              
              <ButtonIcon
                id='acceptBtn'
                //onclick = {}
                ionicon="trash-outline"
              />
            </div> ) : ( 
            <div>
              <span>12/4/2023 </span>
              <span>@Admin1</span>
            </div>
            )}
          </>
        ))}
          </div>
      </div>
    </div>
  );
}
