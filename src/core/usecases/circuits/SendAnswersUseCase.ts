import { CircuitsRepository } from '../../domain/repositories';
import { SendUserQuizAnswersRequest } from '../../adapters/requests';
import { UserQuizResult } from '../../domain/entities';
import { CircuitsErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<UserQuizResult>;

export class SendUserQuizAnswersUseCase {
  constructor(private circuitsRepository: CircuitsRepository) {}

  public async execute(request: SendUserQuizAnswersRequest): Promise<Response> {
    try {
      const result = await this.circuitsRepository.sendUserQuizAnswers(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        CircuitsErrors.SendUserQuizAnswsersError({
          type: 'SEND_USER_QUIZ_ANSWERS_ERROR',
          details: error,
        })
      );
    }
  }
}
