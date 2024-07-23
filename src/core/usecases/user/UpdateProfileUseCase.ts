import { UserRespository } from '../../domain/repositories';
import { UpdateProfileRequest } from '../../adapters/requests/user/UpdateProfileRequest';
import { Profile } from '../../domain/entities';
import { ErrorOr, Result, UserErrors } from '../../domain/models';

type Response = ErrorOr<Profile>;

export class UpdateProfileUseCase {
  constructor(private profileRespository: UserRespository) {}

  public async execute(request: UpdateProfileRequest): Promise<Response> {
    try {
      const result = await this.profileRespository.updateProfile(request);

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        UserErrors.updateProfileError({
          type: 'UPDATE_PROFILE_ERROR',
          details: error,
        })
      );
    }
  }
}
