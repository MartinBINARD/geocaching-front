import { DomainErrorDTO } from './ResultHandling';

export const ProfileErrors = {
  getProfileError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.response?.data?.error,
    };
  },
};
