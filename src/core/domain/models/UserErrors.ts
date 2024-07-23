import { DomainErrorDTO } from './ResultHandling';

export const UserErrors = {
  getProfileError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.response?.data?.error,
    };
  },
};
