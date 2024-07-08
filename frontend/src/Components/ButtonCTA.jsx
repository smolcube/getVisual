import React from 'react';

export default function ButtonCTA(props) {
  return (
    <div>
      <button 
        id={props.id}
        className={props.className}
        type={props.type}
        onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
}
