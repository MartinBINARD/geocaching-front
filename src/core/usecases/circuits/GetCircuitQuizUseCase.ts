import { CircuitsRepository } from '../../domain/repositories';
import { CircuitQuizList } from '../../domain/entities';
import { GetCircuitQuizRequest } from '../../adapters/requests';
import { CircuitsErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<CircuitQuizList>;

export class GetCircuitQuizUseCase {
  constructor(private circuitsRepository: CircuitsRepository) {}

  public async execute(request: GetCircuitQuizRequest): Promise<Response> {
    try {
      const result = await this.circuitsRepository.getCircuitQuiz(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        CircuitsErrors.GetCircuitQuizError({
          type: 'GET_CIRCUIT_QUIZ_ERROR',
          details: error,
        })
      );
    }
  }
}
