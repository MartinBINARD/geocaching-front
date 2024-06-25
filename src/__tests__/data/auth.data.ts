export const rightRegisterFormEntries = {
  pseudo: 'TestUser',
  email: 'testuser@email.com',
  password: 'Y#UJY3{43sgr!454=5',
  confirmation: 'Y#UJY3{43sgr!454=5',
};

export const wrongRegisterFormEntries = {
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

export const rightLoginResponse = {
  id: 1,
  pseudo: 'TestUser',
  email: 'testuser@email.com',
  role: 'member',
  verified: true,
};

export const loginErrorResponse = {
  name: 'AxiosError',
  response: {
    data: {
      error: 'Vous devez valider votre compte avant de vous connecter',
    },
  },
  message: 'Request failed with status code 401',
};

export const forgotPasswordEntrie = {
  email: 'testuser@email.com',
};

export const forgotPasswordErrorResponse = {
  name: 'AxiosError',
  message: 'Request failed with status code 500',
};

export const updateCredentialsEntries = {
  form: {
    password: 'Y#UJY3{43sgr',
    confirmation: 'Y#UJY3{43sgr',
  },
  token: 'secret_token',
  userId: 'user_id',
};

export const updateCredentialsErrorResponse = {
  name: 'AxiosError',
  message: 'Request failed with status code 500',
};
