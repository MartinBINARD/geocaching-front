import { EmailForm } from './auth';

export interface Profile {
  id: number;
  circuits: Circuit[] | null;
  city: string | null;
  count_finished_circuits: number;
  email: string;
  km_traveled: number;
  presentation: string | null;
  pseudo: string;
  region: string | null;
  role: string;
  state: string | null;
  verified: boolean;
}

export interface UpdateProfileForm extends EmailForm {
  pseudo: HTMLInputElement;
  region: HTMLInputElement;
  state: HTMLInputElement;
  city: HTMLInputElement;
  presentation: HTMLTextAreaElement;
}
