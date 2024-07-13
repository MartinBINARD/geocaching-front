import { AuthRepository } from '../../domain/repositories';
import { LoginRequest } from '../../adapters/requests';
import { User } from '../../domain/entities';
import { AuthErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<User>;

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(request: LoginRequest): Promise<Response> {
    try {
      const result = await this.authRepository.login(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        AuthErrors.LoginError({
          type: 'LOGIN_ERROR',
          details: error,
        })
      );
    }
  }
}
