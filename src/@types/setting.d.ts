export interface Login {
  email: Email;
  password: string;
}

export interface User {
  id: number;
  email: string;
  pseudo: string;
  role: string;
  verified: boolean;
}

export interface Register {
  confirmation: string;
  email: string;
  password: string;
  pseudo: string;
}

export interface Session {
  id: number;
  email: string;
  pseudo: string;
  role: string;
  verified: boolean;
}

export interface ResetState {
  formData: HTMLFormElement;
  token: string;
  userId: string;
}
