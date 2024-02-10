import React from 'react';

export default function ButtonIcon(props) {
  return (
    <button
      className={`icn-btn ${props.class}`}
      id={props.id}
      onClick={props.onclick}>
        
      <ion-icon name={props.ionicon} alt={props.alt}></ion-icon>
      {/*<ion-icon name={props.ionicon} alt={props.alt}></ion-icon>*/}
      {props.icon}
    </button>
  );
}
/*

*/