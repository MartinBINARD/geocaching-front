import { DomainErrorDTO } from './ResultHandling';

interface errorRegisterDataState {
  error: string;
}

const AUTH_PSEUDO_ERROR = `Ce pseudo n'est pas valide`;
const AUTH_EMAIL_ERROR = `Cette adresse email n'est pas valide`;
const AUTH_GENERIC_ERROR =
  'Désolé, nous rencontrons quelques problèmes techniques. Veuillez essayer de nouveau.';
const SERVER_ERROR_TYPES = [
  { key: 'user_pseudo_key', message: AUTH_PSEUDO_ERROR },
  { key: 'user_email_key', message: AUTH_EMAIL_ERROR },
];
const SERVER_ERROR_TYPES_EXCEPTION = 'constraint';

export const AuthErrors = {
  RegisterError(e: DomainErrorDTO): DomainErrorDTO {
    const errorData = e.details.response?.data as errorRegisterDataState;

    let errorMessage;

    if (errorData?.error) {
      const foundServerErrorHandle = !errorData.error.includes(
        SERVER_ERROR_TYPES_EXCEPTION
      );
      const foundServerErrorNotHandle = SERVER_ERROR_TYPES.find(({ key }) =>
        errorData.error.includes(key)
      );

      if (foundServerErrorHandle) {
        errorMessage = errorData.error;
      }

      if (foundServerErrorNotHandle) {
        errorMessage = foundServerErrorNotHandle.message;
      }
    } else {
      errorMessage = AUTH_GENERIC_ERROR;
    }

    return {
      type: e.type,
      details: e.details,
      message: errorMessage,
    };
  },
  LoginError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.response?.data?.error,
    };
  },
  FetchSession(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
    };
  },
  Logout(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.response?.data?.error,
    };
  },
  CheckAccountError(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.response?.data?.error,
    };
  },
  ForgotPassword(e: DomainErrorDTO): DomainErrorDTO {
    return {
      type: e.type,
      details: e.details,
      message: e.details.response?.data?.error,
    };
  },
  UpdatePassword(e: DomainErrorDTO): DomainErrorDTO {
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
