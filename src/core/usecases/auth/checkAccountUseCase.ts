import { AuthRepository } from '../../domain/repositories';
import { CheckAccountRequest } from '../../adapters/requests';
import { ConfirmAccount } from '../../domain/entities/ConfirmAccount';
import { AuthErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<ConfirmAccount>;

export class CheckAccountUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(request: CheckAccountRequest): Promise<Response> {
    try {
      const result = await this.authRepository.checkAccount(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        AuthErrors.CheckAccountError({
          type: 'CHECK_ACCOUNT_ERROR',
          details: error,
        })
      );
    }
  }
}
