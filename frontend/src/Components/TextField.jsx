import React from 'react'

export default function TextField(props) {

    return (
      <>
{/* Visually hidden label */}

  <label 
    htmlFor={props.id} 
    className="visually-hidden"
  >
    {props.label}
  </label>

  <ion-icon 
    className="icon1"
    name={props.ionicon1}   
  >
  </ion-icon>
  
    <input
      className="form-fields"
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      name={props.id}
      required="required"
      onChange={props.onChange}
    />

      </>
    );
  }