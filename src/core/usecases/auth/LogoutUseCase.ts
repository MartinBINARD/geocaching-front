import { AuthRepository } from '../../domain/repositories';
import { ConfirmLogout } from '../../domain/entities';
import { AuthErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<ConfirmLogout>;

export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.authRepository.logout();

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        AuthErrors.Logout({
          type: 'LOGOUT_ERROR',
          details: error,
        })
      );
    }
  }
}
