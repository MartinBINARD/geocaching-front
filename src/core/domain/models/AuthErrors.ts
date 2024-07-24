import { DomainErrorDTO } from './ResultHandling';

interface errorRegisterDataState {
  error: string;
}

const AUTH_PESUDO_ERROR = `Ce pseudo n'est pas valide`;
const AUTH_EMAIL_ERROR = `Cette adresse email n'est pas valide`;
const AUTH_PASWORD_ERROR =
  'Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre';
const AUTH_CONFIRM_PASWORD_ERROR =
  'Votre mot de passe doit être identique au précédent';
const AUTH_CONFIRM_GENERIC_ERROR =
  'Désolé, nous rencontrons quelques problèmes techniques. Veuillez essayer de nouveau.';

export const AuthErrors = {
  RegisterError(e: DomainErrorDTO): DomainErrorDTO {
    const errorData = e.details.response?.data as errorRegisterDataState;

    let errorMessage;

    if (errorData?.error) {
      if (errorData?.error.includes('user_pseudo_key')) {
        errorMessage = AUTH_PESUDO_ERROR;
      }

      if (errorData?.error.includes('user_email_key')) {
        errorMessage = AUTH_EMAIL_ERROR;
      }

      if (
        errorData?.error === AUTH_PASWORD_ERROR ||
        AUTH_CONFIRM_PASWORD_ERROR
      ) {
        errorMessage = errorData.error;
      }
    } else {
      errorMessage = AUTH_CONFIRM_GENERIC_ERROR;
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
