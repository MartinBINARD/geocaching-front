import { UpdateProfileRequest } from '../../adapters/requests/user/UpdateProfileRequest';
import { ConfirmDeleteProfile, Profile } from '../entities';

export interface UserRespository {
  getProfile(): Promise<Profile>;
  updateProfile(req: UpdateProfileRequest): Promise<Profile>;
  deleteProfile(): Promise<ConfirmDeleteProfile>;
}
