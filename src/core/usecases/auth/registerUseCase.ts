import { AuthRepository } from '../../domain/repositories';
import { RegisterRequest } from '../../adapters/requests';
import { ConfirmRegister } from '../../domain/entities';
import { AuthErrors, ErrorOr, Result } from '../../domain/models';

type Response = ErrorOr<ConfirmRegister>;

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(request: RegisterRequest): Promise<Response> {
    try {
      const result = await this.authRepository.register(request);

      return Result.ok(result);
    } catch (error) {
      const res = Result.fail(
        AuthErrors.RegisterError({
          type: 'REGISTER_ERROR',
          details: error,
        })
      );

      return res;
    }
  }
}
