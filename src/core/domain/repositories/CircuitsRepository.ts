import { FilterCircuitListRequest } from '../../adapters/requests';
import { FetchCircuitRequest } from '../../adapters/requests/circuits/FetchCircuitRequest';
import { Circuit, CircuitsList } from '../entities';

export interface CircuitsRepository {
  fetchCircuitsList(): Promise<CircuitsList>;
  fetchCircuit(req: FetchCircuitRequest): Promise<Circuit>;
  filterCircuitsList(req: FilterCircuitListRequest): Promise<CircuitsList>;
}
