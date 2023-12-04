/* eslint-disable react/prop-types */
function SettingsInput({ name, type, label, placeholder }) {
  return (
    <>
      <label className="label" for={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        name={name}
        required
      />
    </>
  );
}

export default SettingsInput;
