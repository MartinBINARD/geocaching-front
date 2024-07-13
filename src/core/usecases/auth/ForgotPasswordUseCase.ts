import { AuthRepository } from '../../domain/repositories';
import { ForgotPasswordRequest } from '../../adapters/requests';
import { ConfirmForgotPassword } from '../../domain/entities';
import { AuthErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<ConfirmForgotPassword>;

export class ForgotPasswordUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(request: ForgotPasswordRequest): Promise<Response> {
    try {
      const result = await this.authRepository.forgotPassword(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        AuthErrors.ForgotPassword({
          type: 'FORGOT_PASSWORD_ERROR',
          details: error,
        })
      );
    }
  }
}
