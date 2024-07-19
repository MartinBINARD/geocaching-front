import { CircuitsList } from '../../../domain/entities';

export interface SearchCircuitsRequest {
  city: string;
  description: string;
  distance: string;
  mobility: string;
  region: string;
  state: string;
  theme: string;
}

export interface FilterCircuitListRequest {
  search: SearchCircuitsRequest;
  circuitsList: CircuitsList;
}
