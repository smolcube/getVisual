import React from 'react'

export default function Radio(props) {
  return (
    <>
        <input
        className='radio'
          type="radio"
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          checked={props.checked}
        />
        <label 
          htmlFor={props.htmlFor}>
            {props.label}
        </label>
    </>
  )

}