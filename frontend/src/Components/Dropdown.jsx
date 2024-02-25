import React, { useState } from 'react';

const Dropdown = ({ options, defaultValue, onChange, name }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className='upload-field-input'>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="dropdown-button"
        name={name}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
