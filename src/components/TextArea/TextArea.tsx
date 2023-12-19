interface TextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string | null;
}
function TextArea({ name, label, placeholder, defaultValue }: TextAreaProps) {
  return (
    <div className="form-control my-1">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        className="textarea textarea-bordered h-24 w-full"
      />
    </div>
  );
}

export default TextArea;
