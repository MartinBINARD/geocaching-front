import { Circuit } from '../entities/Circuits';

export interface CircuitsRepository {
  fetchCircuitsList(): Promise<Circuit[]>;
}
