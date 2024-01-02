export interface Circuit {
  id_circuit: number;
  city: string;
  description: string;
  difficulty: number;
  distance: number;
  duration: string;
  introduction: string;
  latitude: number;
  longitude: number;
  maintenance: number;
  mobility: string[];
  name: string;
  parking_address: string;
  region: string;
  state: string;
  terrain: number;
  theme: string;
  url_image: string;
  url_reward: string;
}

export interface Search {
  city?: string;
  description?: string;
  distance?: number;
  mobility?: string[] | string;
  region?: string;
  state?: string;
  theme?: string;
}

export interface SearchState {
  search: Search;
  list: Circuit[];
}

export interface Step {
  answer: number;
  id_step: number;
}

export interface UserCircuitAnswersState {
  id_user: number;
  id_circuit: number;
  steps: Step[];
}

export type UserCircuitAnswersResultState = boolean[];
