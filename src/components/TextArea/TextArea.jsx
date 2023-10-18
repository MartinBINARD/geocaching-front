function TextArea({ keyName, label, placeholder, defaultValue }) {
  return (
    <div className="form-control my-1">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        name={keyName}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        className="textarea textarea-bordered h-24 w-full"
      />
    </div>
  );
}

export default TextArea;
