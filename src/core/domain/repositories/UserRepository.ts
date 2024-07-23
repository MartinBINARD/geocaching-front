import { UpdateProfileRequest } from '../../adapters/requests/user/UpdateProfileRequest';
import { Profile } from '../entities';

export interface UserRespository {
  getProfile(): Promise<Profile>;
  updateProfile(req: UpdateProfileRequest): Promise<Profile>;
}
