import { Profile } from '../../domain/entities';
import { ErrorOr, Result } from '../../domain/models';
import { ProfileErrors } from '../../domain/models/ProfileErrors';
import { ProfileRespository } from '../../domain/repositories';

type Response = ErrorOr<Profile>;

export class GetProfileUseCase {
  constructor(private profileRespository: ProfileRespository) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.profileRespository.getProfile();

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        ProfileErrors.getProfileError({
          type: 'GET_PROFILE_ERROR',
          details: error,
        })
      );
    }
  }
}
