import { DomainErrorDTO } from './ResultHandling';

export const UserErrors = {
  getProfileError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.response?.data?.error,
    };
  },
  updateProfileError(e: DomainErrorDTO): DomainErrorDTO {
    const errorData = e.details.response?.data;
    const errorMessage = errorData?.message
      ? errorData.message
      : errorData.error;

    return {
      type: e.type,
      details: e.details,
      message: errorMessage,
    };
  },
};
