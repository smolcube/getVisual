import React from 'react';
import { NavLink } from 'react-router-dom';

const states = [
  {
    state: "معلقة",
    id: "pending",
    total: "159"
  },
  {
    state: "مرفوضة",
    id: "rejected",
    total: "22"
  },
  {
    state: "مقبولة",
    id: "approved",
    total: "371"
  },
];

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <div className="dashboard__main">
        <h1>لوحة التحكم</h1>
        <p>انقر على اي من البطاقات</p>

        <div className='dashboard__main--cards'>
          {states.map((statie, index) => ( 
            <NavLink
              key={index}
              to={`/getVisual/dashboard/${statie.id}`} 
            >
              <div className="card" id={statie.id}>
                <h3>{statie.state}</h3>
                <br />
                <h3>#{statie.total}</h3>
              </div>
            </NavLink>
          ))}

        </div>
      </div>
    </div>
  )
}
