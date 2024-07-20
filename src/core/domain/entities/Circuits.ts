export interface CircuitWithoutSteps {
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

export type CircuitsList = CircuitWithoutSteps[];

interface Step {
  id: number;
  answer: string | null;
  circuit_id: number;
  created_at: string;
  hint: string | null;
  latitude: number;
  longitude: number;
  order: number;
  paragraph: string;
  question: string;
  transition: string;
  updated_at: string;
}

export type StepsList = Step[];

export interface Circuit extends CircuitWithoutSteps {
  step: StepsList;
  number: number;
  postcode: number;
}
