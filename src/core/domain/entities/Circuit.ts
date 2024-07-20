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

type StepsList = Step[];

export interface Circuit extends CircuitWithoutSteps {
  step: StepsList;
  number: number;
  postcode: number;
}
