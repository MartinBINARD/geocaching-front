function TextInput({
  keyName,
  type,
  label,
  placeholder,
  defaultValue,
  required = false,
}) {
  return (
    <div className="form-control my-1">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        name={keyName}
        type={type}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        className="input input-bordered w-full"
        required={required}
      />
    </div>
  );
}

export default TextInput;
