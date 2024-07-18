import { AxiosInstance } from 'axios';
import { CircuitsRepository } from '../../../domain/repositories/CircuitsRepository';
import { FetchCircuitRequest, FilterCircuitListRequest } from '../../requests';
import { Circuit, CircuitsList } from '../../../domain/entities/Circuits';
import {
  FetchCircuitsListMapper,
  FetchCircuitMapper,
  FilterCircuitsListMapper,
} from '../mappers';
import filterCircuitsList from '../../../usecases/utils/filterCircuitsList';

export class RLCircuitsRepository implements CircuitsRepository {
  constructor(
    private httpClient: AxiosInstance,
    private fetchCircuitsListMapper: FetchCircuitsListMapper,
    private fetchCircuitMapper: FetchCircuitMapper,
    private filterCircuitsListMapper: FilterCircuitsListMapper
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
}
