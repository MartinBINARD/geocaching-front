import { EmailForm, LoginForm } from '../@types/auth';
import { UpdateProfileForm } from '../@types/user';

function setLowerCaseEmail(formData: EmailForm) {
  const emailInput = formData.get('email') as string;
  const emailToLowerCase = emailInput.toLowerCase();

  return formData.set('email', emailToLowerCase);
}

function formatUserDataForm(form: LoginForm | EmailForm | UpdateProfileForm) {
  const formData = new FormData(form) as unknown as
    | LoginForm
    | EmailForm
    | UpdateProfileForm;

  setLowerCaseEmail(formData);

  return Object.fromEntries(formData.entries()) as unknown as
    | LoginForm
    | EmailForm
    | UpdateProfileForm;
}

export default formatUserDataForm;
