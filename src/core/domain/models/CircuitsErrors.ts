import { DomainErrorDTO } from './ResultHandling';

export const CircuitsErrors = {
  FetchCircuitsLisError(e: DomainErrorDTO): DomainErrorDTO {
    const errorData = e.details.response?.data;
    console.log('errorData', errorData);

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
