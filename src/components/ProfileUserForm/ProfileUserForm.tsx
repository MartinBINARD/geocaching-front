import { Dispatch, SetStateAction } from 'react';
import { XCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { Profile, UpdateProfileForm } from '../../@types/user';

import { updateProfile } from '../../store/reducers/user';

import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';

interface ProfileUserFormProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

function ProfileUserForm({ setIsEdit }: ProfileUserFormProps) {
  const isUpdateLoading = useAppSelector((state) => state.user.isUpdateLoading);
  const errorMessage = useAppSelector((state) => state.user.errorMessage);
  const profile = useAppSelector((state) => state.user.profile);

  const { pseudo, email, region, state, city, presentation } =
    profile as Profile;

  const dispatch = useAppDispatch();

  function handleSubmit(e: React.FormEvent<UpdateProfileForm>) {
    e.preventDefault();
    const form = e.target as UpdateProfileForm;

    dispatch(updateProfile(form));
    setIsEdit(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {errorMessage && (
        <p role="alert" className="alert alert-error">
          <XCircle />
          <span>{errorMessage}</span>
        </p>
      )}
      <TextInput
        name="pseudo"
        type="text"
        label="Pseudo"
        placeholder="Taper votre pseudo"
        defaultValue={pseudo}
        className="input input-bordered w-full max-w-md"
        required
      />
      <TextInput
        name="email"
        type="text"
        label="Email"
        placeholder="Tapez votre email"
        defaultValue={email}
        className="input input-bordered w-full max-w-md"
        required
      />
      <TextInput
        name="region"
        type="text"
        label="Région"
        placeholder="Tapez le nom de la région"
        defaultValue={region}
        className="input input-bordered w-full max-w-md"
        required={false}
      />
      <TextInput
        name="state"
        type="text"
        label="Département"
        placeholder="Tapez le nom du département"
        defaultValue={state}
        className="input input-bordered w-full max-w-md"
        required={false}
      />
      <TextInput
        name="city"
        type="text"
        label="Ville"
        placeholder="Tapez le nom de la ville"
        defaultValue={city}
        className="input input-bordered w-full max-w-md"
        required={false}
      />
      <TextArea
        name="presentation"
        label="Présentation "
        placeholder="Ecrivez votre Présentation"
        className="textarea textarea-bordered h-24 max-w-md"
        defaultValue={presentation}
      />
      <button type="submit" className="btn btn-primary mt-3">
        sauvegarder
        {isUpdateLoading && <span className="loading loading-spinner" />}
      </button>
    </form>
  );
}

export default ProfileUserForm;
