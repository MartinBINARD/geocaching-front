import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../service/axios';

import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';

function ProfileForm({ setEdit, ...profile }) {
  const { pseudo, email, region, state, city, presentation } = profile;

  const [errorMessage, setErrorMessage] = useState(null);

  function updateProfile(data) {
    api.patch('/profile', data).then(
      () => {
        setEdit(false);
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
        keyName="pseudo"
        label="Pseudo"
        placeholder="Taper votre pseudo"
        defaultValue={pseudo}
        required
      />

      <TextInput
        keyName="email"
        label="Email"
        placeholder="Tapez votre email"
        defaultValue={email}
        required
      />

      <TextInput
        keyName="region"
        label="Région"
        placeholder="Tapez le nom de la région"
        defaultValue={region}
      />

      <TextInput
        keyName="state"
        label="Département"
        placeholder="Tapez le nom du département"
        defaultValue={state}
      />

      <TextInput
        keyName="city"
        label="Ville"
        placeholder="Tapez le nom de la ville"
        defaultValue={city}
      />

      <TextArea
        keyName="presentation"
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
