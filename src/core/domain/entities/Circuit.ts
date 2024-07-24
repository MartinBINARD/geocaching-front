import { CircuitWithoutSteps } from './CircuitsList';

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

export type CircuitStepsList = Step[];

export interface Circuit extends CircuitWithoutSteps {
  step: CircuitStepsList;
  number: number;
  postcode: number;
}
