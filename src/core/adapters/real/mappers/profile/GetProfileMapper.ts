import { Profile } from '../../../../domain/entities';
import { Mapper } from '../../../../domain/models';

export class GetProfileMapper implements Mapper<Profile> {
  toDomain(raw: any): Profile {
    const {
      id,
      circuits,
      city,
      count_finished_circuits,
      email,
      km_traveled,
      presentation,
      pseudo,
      region,
      role,
      state,
      verified,
    } = raw;

    return {
      id,
      circuits,
      city,
      count_finished_circuits,
      email,
      km_traveled,
      presentation,
      pseudo,
      region,
      role,
      state,
      verified,
    };
  }
}
