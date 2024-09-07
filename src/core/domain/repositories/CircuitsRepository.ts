import {
  FetchCircuitQuizRequest,
  FetchCircuitRequest,
  FilterCircuitListRequest,
} from '../../adapters/requests';
import { SendUserQuizAnswersRequest } from '../../adapters/requests/circuits/SendUserQuizAnswsersRequest';
import {
  Circuit,
  CircuitQuizList,
  CircuitsList,
  UserQuizResult,
} from '../entities';

export interface CircuitsRepository {
  fetchCircuitsList(): Promise<CircuitsList>;
  fetchCircuit(req: FetchCircuitRequest): Promise<Circuit>;
  filterCircuitsList(req: FilterCircuitListRequest): Promise<CircuitsList>;
  fetchCircuitQuiz(req: FetchCircuitQuizRequest): Promise<CircuitQuizList>;
  sendUserQuizAnswers(req: SendUserQuizAnswersRequest): Promise<UserQuizResult>;
}
