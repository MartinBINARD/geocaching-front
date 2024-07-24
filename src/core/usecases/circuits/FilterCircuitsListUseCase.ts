import { CircuitsRepository } from '../../domain/repositories/CircuitsRepository';
import { CircuitsList } from '../../domain/entities';
import { CircuitsErrors, ErrorOr, Result } from '../../domain/models';
import { FilterCircuitListRequest } from '../../adapters/requests';

type Response = ErrorOr<CircuitsList>;

export class FilterCircuitsListUseCase {
  constructor(private circuitsRepository: CircuitsRepository) {}

  public async execute(request: FilterCircuitListRequest): Promise<Response> {
    try {
      const result = await this.circuitsRepository.filterCircuitsList(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        CircuitsErrors.FilterCircuitsListError({
          type: 'FILTER_CIRCUIT_LIST_ERROR',
          details: error,
        })
      );
    }
  }
}
