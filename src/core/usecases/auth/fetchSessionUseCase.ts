import { AuthRepository } from '../../domain/repositories';
import { User } from '../../domain/entities';
import { AuthErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<User>;

export class FetchSessionUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.authRepository.fetchSession();

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        AuthErrors.FetchSession({
          type: 'FETCH_SESSION_ERROR',
          details: error,
        })
      );
    }
  }
}
