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
  maintenance: boolean;
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

export interface CircuitPathStep {
  id: number;
  answer: string | null;
  circuit_id: number;
  hint: string | null;
  latitude: number;
  longitude: number;
  order: number;
  paragraph: string;
  question: string;
  transition: string;
  updated_at: string;
}

export interface CircuitPath extends Circuit {
  postcode?: number;
  step?: CircuitPathStep[];
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

export interface CircuitQuizStep {
  id: number;
  latitude: number;
  longitude: number;
  content: [
    {
      paragraph: string;
      hint: string | null;
      question: string;
    },
    {
      transition: string;
    },
  ];
}

export type StepsEntriesState = Record<string, string | undefined>;

export interface UserCircuitEntriesState {
  userId: number;
  circuitId: number;
  stepsEntries: StepsEntriesState;
}

export type UserCircuitAnswersResultState = boolean[];
