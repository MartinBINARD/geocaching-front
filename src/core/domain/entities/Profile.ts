export interface CircuitProfile {
  id: number;
  description: string;
  name: string;
  url_image: string;
  url_reward: string;
}

type CircuitProfileList = CircuitProfile[] | null;

export interface Profile {
  id: number;
  circuits: CircuitProfileList;
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
