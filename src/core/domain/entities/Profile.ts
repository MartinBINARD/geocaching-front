export interface CircuitProfile {
  id: number;
  city: string;
  description: string;
  name: string;
  url_image: string;
  url_reward: string;
}

export interface Profile {
  id: number;
  circuits: CircuitProfile[] | null;
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
