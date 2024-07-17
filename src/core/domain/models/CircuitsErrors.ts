import { DomainErrorDTO } from './ResultHandling';

export const CircuitsErrors = {
  FetchCircuitsLisError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.message,
    };
  },
};
