import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import TextInput from '../TextInput/TextInput';

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
  className: string;
}

export default function PasswordInput({
  name,
  label,
  placeholder,
  className,
}: PasswordInputProps) {
  const [inputType, setInputType] = useState<string>('password');

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };

  return (
    <div className="relative">
      <TextInput
        name={name}
        type={inputType}
        label={label}
        placeholder={placeholder}
        className={className}
        defaultValue=""
        required
      />
      <span
        className="absolute cursor-pointer my-3 end-2"
        onClick={handleToggle}
      >
        {inputType === 'password' ? <EyeOff /> : <Eye />}
      </span>
    </div>
  );
}
