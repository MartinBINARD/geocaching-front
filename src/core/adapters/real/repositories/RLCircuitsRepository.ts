import { AxiosInstance } from 'axios';
import { CircuitsRepository } from '../../../domain/repositories/CircuitsRepository';
import { FetchCircuitRequest } from '../../requests/circuits/FetchCircuitRequest';
import { Circuit, CircuitsList } from '../../../domain/entities/Circuits';
import { FetchCircuitsListMapper, FetchCircuitMapper } from '../mappers';

export class RLCircuitsRepository implements CircuitsRepository {
  constructor(
    private httpClient: AxiosInstance,
    private fetchCircuitsListMapper: FetchCircuitsListMapper,
    private fetchCircuitMapper: FetchCircuitMapper
  ) {}

  async fetchCircuitsList(): Promise<CircuitsList> {
    const result = await this.httpClient.get('circuits');

    return this.fetchCircuitsListMapper.toDomain(result.data);
  }

  async fetchCircuit(req: FetchCircuitRequest): Promise<Circuit> {
    const result = await this.httpClient.get(`circuits/${req}`);

    return this.fetchCircuitMapper.toDomain(result.data);
  }
}
