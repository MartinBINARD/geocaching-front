import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/redux';

import { Profile } from '../../@types/user';

import api from '../../service/axios';

import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';

interface ProfileFormProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

function ProfileForm({ setIsEdit }: ProfileFormProps) {
  const profile = useAppSelector((state) => state.user.profile);
  const { pseudo, email, region, state, city, presentation } =
    profile as Profile;

  const [errorMessage, setErrorMessage] = useState(null);

  function updateProfile(data) {
    api.patch('/profile', data).then(
      () => {
        setIsEdit(false);
        toast.success('Votre profil a bien été mis à jour');
      },
      (err) => {
        setErrorMessage(err.response.data.error);
      }
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Making the email to lower case before checking at database
    const emailInput = formData.get('email');
    const emailToLowerCase = emailInput.toLowerCase();
    formData.set('email', emailToLowerCase);

    const objData = Object.fromEntries(formData.entries());

    updateProfile(objData);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {errorMessage && <h2>{errorMessage}</h2>}
      <TextInput
        name="pseudo"
        type="text"
        label="Pseudo"
        placeholder="Taper votre pseudo"
        defaultValue={pseudo}
        className="input input-bordered w-full max-w-xs"
        required
      />
      <TextInput
        name="email"
        type="email"
        label="Email"
        placeholder="Tapez votre email"
        defaultValue={email}
        className="input input-bordered w-full max-w-xs"
        required
      />
      <TextInput
        name="region"
        type="text"
        label="Région"
        placeholder="Tapez le nom de la région"
        defaultValue={region}
        className="input input-bordered w-full max-w-xs"
        required={false}
      />
      <TextInput
        name="state"
        type="text"
        label="Département"
        placeholder="Tapez le nom du département"
        defaultValue={state}
        className="input input-bordered w-full max-w-xs"
        required={false}
      />
      <TextInput
        name="city"
        type="text"
        label="Ville"
        placeholder="Tapez le nom de la ville"
        defaultValue={city}
        className="input input-bordered w-full max-w-xs"
        required={false}
      />
      <TextArea
        name="presentation"
        label="Présentation "
        placeholder="Ecrivez votre Présentation"
        defaultValue={presentation}
      />
      <button type="submit" className="btn btn-primary mt-3">
        sauvegarder
      </button>
    </form>
  );
}

export default ProfileForm;
