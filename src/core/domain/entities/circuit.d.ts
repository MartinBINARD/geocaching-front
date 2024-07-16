import { Circuit } from './Circuit';

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

export interface CircuitQuizContentParagraph {
  paragraph: string;
  hint: string | null;
  question: string;
}

export interface CircuitQuizContentTransition {
  transition: string;
}

export interface CircuitQuizContentArray
  extends Array<CircuitQuizContentParagraph, CircuitQuizContentTransition> {}

export interface CircuitQuizStep {
  id: number;
  latitude: number;
  longitude: number;
  content: CircuitQuizContentArray;
}

export type StepsEntriesState = Record<string, string | undefined>;

export interface UserCircuitEntriesState {
  userId: number;
  circuitId: number;
  stepsEntries: StepsEntriesState;
}

export type UserCircuitAnswersResultState = boolean[];
