import { CircuitsList } from '../../../domain/entities';

interface SearchCircuitsRequest {
  city?: string;
  description?: string;
  distance?: number;
  mobility?: string[] | string;
  region?: string;
  state?: string;
  theme?: string;
}

export interface FilterCircuitListRequest {
  search: SearchCircuitsRequest;
  circuitsList: CircuitsList;
}
