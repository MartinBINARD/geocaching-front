import { EmailForm, LoginForm } from '../../domain/entities/auth';
import { UpdateProfileForm } from '../../domain/entities/user';

function setLowerCaseEmail(formData: EmailForm) {
  const emailInput = formData.get('email');
  const emailToLowerCase = emailInput.toLowerCase();

  return formData.set('email', emailToLowerCase);
}

function formatUserDataForm(form: LoginForm | EmailForm | UpdateProfileForm) {
  const formData = new FormData(form) as unknown as
    | LoginForm
    | EmailForm
    | UpdateProfileForm;

  setLowerCaseEmail(formData as EmailForm);

  return Object.fromEntries(formData.entries());
}

export default formatUserDataForm;
