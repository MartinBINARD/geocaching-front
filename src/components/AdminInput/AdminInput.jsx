/* eslint-disable react/prop-types */

// build a componant for dashboard's inputs
function AdminInput({
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <>
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className="input input-bordered w-full"
        name={name}
        onChange={onChange}
        value={value}
        required={required}
      />
    </>
  );
}

export default AdminInput;
