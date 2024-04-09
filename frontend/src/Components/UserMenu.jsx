import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const admin = JSON.parse(localStorage.getItem("Admin"));
const isLoggedIn = !!currentUser || !!admin; // Check if a user is logged in

export default function UserMenu() {
  console.log(admin);

  return (
    <div className='user-menu shadow2'>
      <ul>
        {currentUser && currentUser.accType === "customer" && (
          <>
            <li className="user-menu__items">
              <Link to={`/getVisual/users/${currentUser.username}`}>Profile</Link>
            </li>
            <li className="user-menu__items">
              <Link to={`/getVisual/upload/users/${currentUser.username}/settings`}>Settings</Link>
            </li>
            <li className="user-menu__items">
              <Link to='/getVisual/auth/logout'>Logout</Link>
            </li>
          </>
        )}
        {currentUser && currentUser.accType === "user" && (
          <>
            <li className="user-menu__items">
              <Link to={`/getVisual/users/${currentUser.username}`}>Profile</Link>
            </li>
            <li className="user-menu__items">
              <Link to={`/getVisual/upload/users/${currentUser.username}/post-package`}>Post Service</Link>
            </li>
            <li className="user-menu__items">
              <Link to={`/getVisual/upload/users/${currentUser.username}/settings`}>Settings</Link>
            </li>
            <li className="user-menu__items">
              <Link to='/getVisual/auth/logout'>Logout</Link>
            </li>
          </>
        )}
        {admin && (
          <>
            <li className="user-menu__items">
              <Link to="/getVisual/dashboard/">Dashboard</Link>
            </li>
            <li className="user-menu__items">
              <Link to={`/getVisual/dashboard/${admin.username}/profile`}>Profile</Link>
            </li>
            <li className="user-menu__items">
              <Logout />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
