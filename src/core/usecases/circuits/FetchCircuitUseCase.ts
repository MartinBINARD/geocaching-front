import { CircuitsRepository } from '../../domain/repositories';
import { FetchCircuitRequest } from '../../adapters/requests';
import { Circuit } from '../../domain/entities';
import { CircuitsErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<Circuit>;

export class FetchCircuitUseCase {
  constructor(private circuitsRepository: CircuitsRepository) {}

  public async execute(request: FetchCircuitRequest): Promise<Response> {
    try {
      const result = await this.circuitsRepository.fetchCircuit(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        CircuitsErrors.FetchCircuitError({
          type: 'FETCH_CIRCUIT_ERROR',
          details: error,
        })
      );
    }
  }
}
