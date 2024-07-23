import { AxiosInstance } from 'axios';
import { UserRespository } from '../../../domain/repositories';
import { GetProfileMapper, UpdateProfileMapper } from '../mappers';
import { UpdateProfileRequest } from '../../requests/user/UpdateProfileRequest';
import { Profile } from '../../../domain/entities';

export class RLUserRepository implements UserRespository {
  constructor(
    private httpClient: AxiosInstance,
    private getProfileMapper: GetProfileMapper,
    private updateProfileMapper: UpdateProfileMapper
  ) {}

  async getProfile() {
    const result = await this.httpClient.get('profile');

    return this.getProfileMapper.toDomain(result.data);
  }

  async updateProfile(req: UpdateProfileRequest): Promise<Profile> {
    const result = await this.httpClient.patch('profile', req);

    return this.updateProfileMapper.toDomain(result.data);
  }
}
