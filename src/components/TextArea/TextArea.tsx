interface TextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  className: string;
  defaultValue: string | null;
}
function TextArea({
  name,
  label,
  placeholder,
  className,
  defaultValue,
}: TextAreaProps) {
  return (
    <div className="form-control my-1">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}

export default TextArea;
