import { UserRespository } from '../../domain/repositories';
import { ConfirmDeleteProfile } from '../../domain/entities';
import { ErrorOr, Result, UserErrors } from '../../domain/models';

type Response = ErrorOr<ConfirmDeleteProfile>;

export class DeleteProfileUseCase {
  constructor(private profileRespository: UserRespository) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.profileRespository.deleteProfile();

      return Result.ok(result);
    } catch (error) {
      return Result.fail(
        UserErrors.deleteProfileError({
          type: 'DELETE_PROFILE_ERROR',
          details: error,
        })
      );
    }
  }
}
