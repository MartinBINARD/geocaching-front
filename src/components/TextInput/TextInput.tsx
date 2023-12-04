interface TextInputProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  className: string;
  defaultValue: string;
  required: boolean;
}

function TextInput({
  name,
  type,
  label,
  placeholder,
  className,
  defaultValue = '',
  required = false,
}: TextInputProps) {
  return (
    <>
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        className={className}
        required={required}
      />
    </>
  );
}

export default TextInput;
