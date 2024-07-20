import { CircuitsRepository } from '../../domain/repositories/CircuitsRepository';
import { CircuitsList } from '../../domain/entities/CircuitsList';
import { CircuitsErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<CircuitsList>;

export class FetchCircuitsListUseCase {
  constructor(private circuitsRepository: CircuitsRepository) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.circuitsRepository.fetchCircuitsList();

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        CircuitsErrors.FetchCircuitsLisError({
          type: 'FETCH_CIRCUITS_LIST_ERROR',
          details: error,
        })
      );
    }
  }
}
