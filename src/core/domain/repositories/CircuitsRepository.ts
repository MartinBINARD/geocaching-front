import {
  FetchCircuitRequest,
  FilterCircuitListRequest,
  GetCircuitQuizRequest,
} from '../../adapters/requests';
import { Circuit, CircuitQuizList, CircuitsList } from '../entities';

export interface CircuitsRepository {
  fetchCircuitsList(): Promise<CircuitsList>;
  fetchCircuit(req: FetchCircuitRequest): Promise<Circuit>;
  filterCircuitsList(req: FilterCircuitListRequest): Promise<CircuitsList>;
  getCircuitQuiz(req: GetCircuitQuizRequest): Promise<CircuitQuizList>;
}
