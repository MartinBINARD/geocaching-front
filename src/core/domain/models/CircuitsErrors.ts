import { DomainErrorDTO } from './ResultHandling';

export const CircuitsErrors = {
  FetchCircuitsLisError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.message,
    };
  },
  FetchCircuitError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.message,
    };
  },
  FilterCircuitsListError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.message,
    };
  },
  GetCircuitQuizError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.message,
    };
  },
};
