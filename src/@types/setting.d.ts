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
  isAccountConfirmed: string;
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

export interface ResetState {
  formData: HTMLFormElement;
  token: string;
  userId: string;
}
