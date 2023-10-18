export interface CreateCircuitForm {
  name: string;
  city: string;
  parking_address: string;
  description: string;
  introduction: string;
  city_postcode: number;
  state: string;
  state_code: number;
  region: string;
  reward: Reward;
  steps: StepForm[];
  duration: string;
  distance: number;
  latitude: number;
  longitude: number;
  theme: string;
  difficulty: string;
  terrain: string;
  mobility?: string[];
  maintenance: boolean;
  image: HTMLInputElement;
  reward: HTMLInputElement;
}

interface StepForm {
  order: number;
  question: string;
  answer: number;
  latitude: number;
  longitude: number;
  paragraph: string;
  hint?: string;
  transition?: string;
}

export interface ModifyCircuitForm {
  id: number;
  updatedData: CreateCircuitForm;
}
