import React from 'react';
import { Link } from 'react-router-dom';

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

export default function UserMenu() {

  const accType = currentUser?.accType;

  return (
    <div className='user-menu shadow2'>
      <ul>
        {accType === 'customer' ? (
          <>
            <li className="user-menu__items">
              <Link to={`/getVisual/users/${currentUser.username}`}>Profile</Link>
            </li>
            <li className="user-menu__items">
              <Link to={`/getVisual/upload/users/${currentUser.username}/settings`}>Settings</Link>
            </li>
            <li className="user-menu__items">
              <Link to='/auth/logout'>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className="user-menu__items">
              <Link to={`/getVisual/users/${currentUser.username}`}>Profile</Link>
            </li>
            <li className="user-menu__items">
              <Link to={`/getVisual/upload/users/${currentUser.username}/post-package`}>Post Package</Link>
            </li>
            <li className="user-menu__items">
              <Link to={`/getVisual/upload/users/${currentUser.username}/settings`}>Settings</Link>
            </li>
            <li className="user-menu__items">
              <Link to='/auth/logout'>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
