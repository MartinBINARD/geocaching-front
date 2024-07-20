import { AxiosInstance } from 'axios';
import { CircuitsRepository } from '../../../domain/repositories/CircuitsRepository';
import {
  FetchCircuitRequest,
  FilterCircuitListRequest,
  GetCircuitQuizRequest,
} from '../../requests';
import { Circuit, CircuitQuiz, CircuitsList } from '../../../domain/entities';
import {
  FetchCircuitsListMapper,
  FetchCircuitMapper,
  FilterCircuitsListMapper,
  GetCircuitMapper,
} from '../mappers';
import filterCircuitsList from '../../../usecases/utils/filterCircuitsList';
import getCircuitQuiz from '../../../usecases/utils/getCircuitQuiz';

export class RLCircuitsRepository implements CircuitsRepository {
  constructor(
    private httpClient: AxiosInstance,
    private fetchCircuitsListMapper: FetchCircuitsListMapper,
    private fetchCircuitMapper: FetchCircuitMapper,
    private filterCircuitsListMapper: FilterCircuitsListMapper,
    private getCircuitMapper: GetCircuitMapper
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

  async getCircuitQuiz(req: GetCircuitQuizRequest): Promise<CircuitQuiz> {
    const result = await getCircuitQuiz(req);

    return this.getCircuitMapper.toDomain(result);
  }
}
