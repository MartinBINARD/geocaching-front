export interface LoginForm extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export interface RegisterForm extends LoginForm {
  confirmation: string;
  pseudo: string;
}

export interface RegisterSucces {
  message: string;
}

export interface UserRequirements {
  role: string;
  verified: string;
}

export interface User extends UserRequirements {
  id: number;
  email: string;
  pseudo: string;
}

export interface Session extends UserRequirements {
  id: number;
  email: string;
  pseudo: string;
}

export interface ResetUserPasswordForm extends HTMLFormElement {
  password: HTMLInputElement;
  confirmation: HTMLInputElement;
}

export interface ResetCredentials {
  form: ResetUserPasswordForm;
  token: string | null;
  userId: string | null;
}
