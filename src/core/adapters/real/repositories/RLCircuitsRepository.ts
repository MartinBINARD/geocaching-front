import { AxiosInstance } from 'axios';
import { CircuitsRepository } from '../../../domain/repositories/CircuitsRepository';
import {
  FetchCircuitRequest,
  FilterCircuitListRequest,
  GetCircuitQuizRequest,
  SendUserQuizAnswersRequest,
} from '../../requests';
import {
  Circuit,
  CircuitQuizList,
  CircuitsList,
  UserQuizResult,
} from '../../../domain/entities';
import {
  FetchCircuitsListMapper,
  FetchCircuitMapper,
  FilterCircuitsListMapper,
  GetCircuitMapper,
  SendUserQuizAnswersMapper,
} from '../mappers';
import filterCircuitsListInStore from '../instore/filterCircuitsListInStore';
import getCircuitQuizInStore from '../instore/getCircuitQuizInStore';

export class RLCircuitsRepository implements CircuitsRepository {
  constructor(
    private httpClient: AxiosInstance,
    private fetchCircuitsListMapper: FetchCircuitsListMapper,
    private fetchCircuitMapper: FetchCircuitMapper,
    private filterCircuitsListMapper: FilterCircuitsListMapper,
    private getCircuitMapper: GetCircuitMapper,
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
    const result = await filterCircuitsListInStore(req);

    return this.filterCircuitsListMapper.toDomain(result);
  }

  async getCircuitQuiz(req: GetCircuitQuizRequest): Promise<CircuitQuizList> {
    const result = await getCircuitQuizInStore(req);

    return this.getCircuitMapper.toDomain(result);
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
