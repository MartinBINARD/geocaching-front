import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import TextInput from '../TextInput/TextInput';

interface PasswordInputsCheckerProps {
  className: string;
}

export default function PasswordInputsChecker({
  className,
}: PasswordInputsCheckerProps) {
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
    <>
      <div className="relative">
        <TextInput
          name="password"
          type={inputType}
          label="Mot de passe"
          placeholder="Renseignez votre mot de passe"
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
      <TextInput
        name="confirmation"
        type={inputType}
        label="Confirmation du mot de passe"
        placeholder="Comfirmez votre mot de passe"
        defaultValue=""
        className={className}
        required
      />
    </>
  );
}
