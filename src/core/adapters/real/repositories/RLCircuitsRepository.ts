import { AxiosInstance } from 'axios';
import { FetchCircuitQuizFromStore } from '../instore/FetchCircuitQuizFromStore';
import { FilterCircuitListFromStore } from '../instore/FilterCircuitsListFromStore';
import {
  Circuit,
  CircuitQuizList,
  CircuitsList,
  UserQuizResult,
} from '../../../domain/entities';
import { CircuitsRepository } from '../../../domain/repositories/CircuitsRepository';
import {
  FetchCircuitQuizRequest,
  FetchCircuitRequest,
  FilterCircuitListRequest,
  SendUserQuizAnswersRequest,
} from '../../requests';
import {
  FetchCircuitMapper,
  FetchCircuitQuizMapper,
  FetchCircuitsListMapper,
  FilterCircuitsListMapper,
  SendUserQuizAnswersMapper,
} from '../mappers';

export class RLCircuitsRepository implements CircuitsRepository {
  constructor(
    private httpClient: AxiosInstance,
    private fetchCircuitQuizFromStore: FetchCircuitQuizFromStore,
    private filterCircuitListFromStore: FilterCircuitListFromStore,
    private fetchCircuitsListMapper: FetchCircuitsListMapper,
    private fetchCircuitMapper: FetchCircuitMapper,
    private filterCircuitsListMapper: FilterCircuitsListMapper,
    private fetchCircuitQuizMapper: FetchCircuitQuizMapper,
    private sendUserQuizAnswersMapper: SendUserQuizAnswersMapper
  ) {}

  async fetchCircuitsList(): Promise<CircuitsList> {
    const result = await this.httpClient.get('circuits');

    return this.fetchCircuitsListMapper.toDomain(result.data);
  }

  async fetchCircuit(req: FetchCircuitRequest): Promise<Circuit> {
    const result = await this.httpClient.get(`circuits/${req}`);

    return this.fetchCircuitMapper.toDomain(result.data);
  }

  async filterCircuitsList(
    req: FilterCircuitListRequest
  ): Promise<CircuitsList> {
    const result = await this.filterCircuitListFromStore.execute(req);

    return this.filterCircuitsListMapper.toDomain(result);
  }

  async fetchCircuitQuiz(
    req: FetchCircuitQuizRequest
  ): Promise<CircuitQuizList> {
    const result = await this.fetchCircuitQuizFromStore.execute(req);

    return this.fetchCircuitQuizMapper.toDomain(result);
  }

  async sendUserQuizAnswers(
    req: SendUserQuizAnswersRequest
  ): Promise<UserQuizResult> {
    const result = await this.httpClient.post(
      `circuits/${req.id_circuit}/answer`,
      req
    );

    return this.sendUserQuizAnswersMapper.toDomain(result.data);
  }
}
