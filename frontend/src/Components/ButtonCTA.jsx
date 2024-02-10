
import React from 'react'

export default function ButtonCTA(props) {
  return (
    <div>
    <button className={props.class}
        type={props.type}
        onClick={props.function}>
        {props.name}
      </button>
    </div>
  )
}
