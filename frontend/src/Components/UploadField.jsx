import React from 'react';

export default function UploadField(props) {
  const inputClassName = `upload-field-input ${props.input_additionalClassName}`;
  const labelClassName = `upload-field-label ${props.label_additionalClassName}`;

  return (
    <div>
      <label htmlFor={props.id} className={labelClassName}>
        {props.label}
      </label>

      <input
        className={inputClassName}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}
