import { AuthRepository } from '../../repositories';
import { CheckAccountRequest } from '../../../adapters/requests';
import { ConfirmAccount } from '../../entities/ConfirmAccount';

type Response = ConfirmAccount;

export class CheckAccountUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(request: CheckAccountRequest): Promise<Response> {
    try {
      return await this.authRepository.checkAccount(request);
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}
