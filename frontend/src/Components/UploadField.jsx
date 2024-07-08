import React from 'react';

export default function UploadField(props) {
  const inputClassName = `upload-field-input ${props.input_additionalClassName}`;
  const labelClassName = `upload-field-label ${props.label_additionalClassName}`;

  return (
    <div className={props.divClass}>
      <label htmlFor={props.id} className={labelClassName}>
        {props.label}
      </label>

      <input
        className={`${inputClassName} ${props.classname2}`} // Adjusted classname2
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        required
      />
    </div>
  );
}
