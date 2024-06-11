import { UpdateCredentials } from '../domain/entities/auth';

function formatUserUpdateCredentials(credentials: UpdateCredentials) {
  const { form, token, userId } = credentials;
  const formData = new FormData(form);
  const objectData = Object.fromEntries(formData.entries());
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const user_id = parseInt(userId, 10);

  const newObjectData = { ...objectData, token, user_id };

  return newObjectData;
}

export default formatUserUpdateCredentials;
