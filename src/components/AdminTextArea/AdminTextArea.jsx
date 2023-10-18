/* eslint-disable react/prop-types */
import React from 'react';

// Building a componant for the dashboard's text areas

function AdminTextArea({
  name,
  label,
  placeholder,
  onChange,
  value,
  required,
}) {
  return (
    <>
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        className="input input-bordered h-24 w-full"
        name={name}
        onChange={onChange}
        value={value}
        required={required}
      />
    </>
  );
}

export default AdminTextArea;
