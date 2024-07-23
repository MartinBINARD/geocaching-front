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

    let errorMessage;

    if (errorData?.message) {
      errorMessage = errorData.message;
    } else {
      errorMessage = errorData.error;
    }

    return {
      type: e.type,
      details: e.details,
      message: errorMessage,
    };
  },
};
