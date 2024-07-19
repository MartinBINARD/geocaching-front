interface CircuitWithoutSteps {
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

interface Step {
  id: number;
  order: number;
  question: string;
  latitude: number;
  longitude: number;
  hint: string | null;
  paragraph: string;
  circuit_id: number;
  created_at: string;
  updated_at: string;
}

export type StepsList = Step[];

export interface Circuit extends CircuitWithoutSteps {
  step: StepsList;
  number: number;
  postcode: number;
}

export type CircuitsList = Circuit[];
