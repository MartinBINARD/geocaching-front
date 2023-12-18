import { UpdateCredentials } from '../@types/setting';

function formatUserUpdateCredentials(credentials: UpdateCredentials) {
  const { form, token, userId } = credentials;
  const formData = new FormData(form);
  const objectData = Object.fromEntries(formData.entries());

  const newObjectData = { ...objectData, token, user_Id: userId };

  return newObjectData;
}

export default formatUserUpdateCredentials;
