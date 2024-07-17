import { FetchCircuitRequest } from '../../adapters/requests/circuits/FetchCircuitRequest';
import { Circuit } from '../entities/Circuits';

export interface CircuitsRepository {
  fetchCircuitsList(): Promise<Circuit[]>;
  fetchCircuit(req: FetchCircuitRequest): Promise<Circuit>;
}
