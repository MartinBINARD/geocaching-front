import { LoginRequest } from '../../adapters/requests';
import { User } from '../../domain/entities/User';
import { AuthRepository } from '../../domain/repositories';

type Response = User;

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(request: LoginRequest): Promise<Response> {
    try {
      return await this.authRepository.login(request);
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}
