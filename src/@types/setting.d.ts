export interface UserRequirements {
  role: string;
  isVerified: string;
}

export interface User extends UserRequirements {
  id: number;
  email: string;
  pseudo: string;
}

export interface Register {
  confirmation: string;
  email: string;
  password: string;
  pseudo: string;
}

export interface Login extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
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
