import { AxiosInstance } from 'axios';
import { CircuitsRepository } from '../../../domain/repositories/CircuitsRepository';
import {
  FetchCircuitRequest,
  FilterCircuitListRequest,
  GetCircuitQuizRequest,
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
import filterCircuitsList from '../../../usecases/utils/filterCircuitsList';
import getCircuitQuiz from '../../../usecases/utils/getCircuitQuiz';
import { SendUserQuizAnswersRequest } from '../../requests/circuits/SendUserQuizAnswsersRequest';

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
    const result = await filterCircuitsList(req);

    return this.filterCircuitsListMapper.toDomain(result);
  }

  async getCircuitQuiz(req: GetCircuitQuizRequest): Promise<CircuitQuizList> {
    const result = await getCircuitQuiz(req);

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
