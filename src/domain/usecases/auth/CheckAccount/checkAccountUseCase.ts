import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../services/axios';
import { AuthRepository } from '../../../repositories';
import { CheckAccountRequest } from '../../../../adapters/requests';
import { ConfirmAccount } from '../../../entities/ConfirmAccount';

type Response = ConfirmAccount;

class CheckAccountUseCase {
  constructor(private authRepository: AuthRepository) {}

  public async execute(request: CheckAccountRequest): Promise<Response> {
    try {
      return await this.authRepository.checkAccount(request);
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}

export const checkAccount = createAsyncThunk(
  'settings/confirm-user-account',
  async (token: string): Promise<boolean> => {
    try {
      const { data } = await api.get(`verify?token=${token}`);

      return data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
