import { Profile } from '../../domain/entities';
import { ErrorOr, Result } from '../../domain/models';
import { UserErrors } from '../../domain/models/UserErrors';
import { UserRespository } from '../../domain/repositories';

type Response = ErrorOr<Profile>;

export class GetProfileUseCase {
  constructor(private profileRespository: UserRespository) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.profileRespository.getProfile();

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        UserErrors.getProfileError({
          type: 'GET_PROFILE_ERROR',
          details: error,
        })
      );
    }
  }
}
