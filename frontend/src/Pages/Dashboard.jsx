import React from 'react';
import { NavLink } from 'react-router-dom';

const states = [
  {
    state: "Pending",
    id: "pending"
  },
  {
    state: "Rejected",
    id: "rejected"
  },
  {
    state: "Approved",
    id: "approved"
  },
];

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <div className="dashboard__main">
        <h1>Welcome to Dashboard</h1>
        <p>click on any of the cards below</p>
        <div className='dashboard__main--cards'>

          {states.map((statie, index) => ( 
            <NavLink
              key={index}
              to={`/getVisual/dashboard/main/${statie.id}`} 
            >
              <div className="card" id={statie.id}>
                <h3>{statie.state}</h3>
              </div>
            </NavLink>
          ))}

        </div>
      </div>
    </div>
  )
}
