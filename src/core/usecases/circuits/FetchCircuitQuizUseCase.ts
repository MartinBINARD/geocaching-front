import { GetCircuitQuizRequest } from '../../adapters/requests';
import { CircuitQuizList } from '../../domain/entities';
import { CircuitsErrors, ErrorOr, Result } from '../../domain/models';
import { CircuitsRepository } from '../../domain/repositories';

type Response = ErrorOr<CircuitQuizList>;

export class FetchCircuitQuizUseCase {
  constructor(private circuitsRepository: CircuitsRepository) {}

  public async execute(request: GetCircuitQuizRequest): Promise<Response> {
    try {
      const result = await this.circuitsRepository.getCircuitQuiz(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        CircuitsErrors.FetchCircuitQuizError({
          type: 'GET_CIRCUIT_QUIZ_ERROR',
          details: error,
        })
      );
    }
  }
}
