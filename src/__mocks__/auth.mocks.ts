export const checkAccountEntries = 'faketoken';

export const validRegisterFormEntries = {
  pseudo: 'TestUser',
  email: 'testuser@email.com',
  password: 'Y#UJY3{43sgr!454=5',
  confirmation: 'Y#UJY3{43sgr!454=5',
};

export const invalidRegisterFormEntries = {
  pseudo: 'TestUser',
  email: 'testuser@email.com',
  password: 'Y#UJY3{43sgr!454=5',
  confirmation: 'Y',
};

export const registerMessageResponse = {
  message:
    'Votre compte a bien été créé. Un email de confirmation vous a été envoyé',
};

export const registerErrorEmailResponse = {
  name: 'AxiosError',
  message: "Cette adresse email n'est pas valide",
};

export const registerErrorPseudoResponse = {
  name: 'AxiosError',
  message: "Ce pseudo n'est pas valide",
};

export const registerErrorGenericResponse = {
  name: 'AxiosError',
  message:
    'Désolé, nous rencontrons quelques problèmes techniques. Veuillez essayer de nouveau.',
};

export const loginEntries = {
  email: 'testuser@email.com',
  password: 'Y#UJY3{43sgr!454=5',
};

export const validLoginResponse = {
  id: 1,
  pseudo: 'TestUser',
  email: 'testuser@email.com',
  role: 'member',
  verified: true,
};

export const loginErrorResponse = {
  name: 'AxiosError',
  message: 'Informations erronées',
};

export const logoutResponse = {
  message: 'Vous avez bien été déconnecté',
};

export const forgotPasswordEntrie = {
  email: 'testuser@email.com',
};

export const forgotPasswordErrorResponse = {
  name: 'AxiosError',
  message: 'Request failed with status code 500',
};

export const updatePasswordEntries = {
  token: 'secret_token',
  userId: 1,
  password: 'Y#UJY3{43sgr',
  confirmation: 'Y#UJY3{43sgr',
};

export const updatePasswordErrorResponse = {
  name: 'AxiosError',
  message: 'Request failed with status code 500',
};
