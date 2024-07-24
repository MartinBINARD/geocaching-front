import { AuthRepository } from '../../domain/repositories';
import { UpdatePasswordRequest } from '../../adapters/requests';
import { ConfirmUpdatePassword } from '../../domain/entities';
import { AuthErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<ConfirmUpdatePassword>;

export class UpdatePasswordUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(request: UpdatePasswordRequest): Promise<Response> {
    try {
      const result = await this.authRepository.updatePassword(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        AuthErrors.UpdatePassword({
          type: 'RESET_PASSWORD_ERROR',
          details: error,
        })
      );
    }
  }
}
