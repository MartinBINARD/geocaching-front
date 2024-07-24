import { AxiosInstance } from 'axios';
import { UserRespository } from '../../../domain/repositories';
import {
  GetProfileMapper,
  UpdateProfileMapper,
  DeleteProfileMapper,
} from '../mappers';
import { UpdateProfileRequest } from '../../requests/user/UpdateProfileRequest';
import { ConfirmDeleteProfile, Profile } from '../../../domain/entities';

export class RLUserRepository implements UserRespository {
  constructor(
    private httpClient: AxiosInstance,
    private getProfileMapper: GetProfileMapper,
    private updateProfileMapper: UpdateProfileMapper,
    private deleteProfileMapper: DeleteProfileMapper
  ) {}

  async getProfile() {
    const result = await this.httpClient.get('profile');

    return this.getProfileMapper.toDomain(result.data);
  }

  async updateProfile(req: UpdateProfileRequest): Promise<Profile> {
    const result = await this.httpClient.patch('profile', req);

    return this.updateProfileMapper.toDomain(result.data);
  }

  async deleteProfile(): Promise<ConfirmDeleteProfile> {
    const result = await this.httpClient.delete('profile');

    return this.deleteProfileMapper.toDomain(result.data);
  }
}
