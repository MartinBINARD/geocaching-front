import { EmailForm, LoginForm } from '../@types/auth';

function setLowerCaseEmail(formData: EmailForm) {
  const emailInput = formData.get('email') as string;
  const emailToLowerCase = emailInput.toLowerCase();

  return formData.set('email', emailToLowerCase);
}

function formatUserDataForm(form: LoginForm | EmailForm) {
  const formData = new FormData(form) as unknown as LoginForm | EmailForm;

  setLowerCaseEmail(formData);

  return Object.fromEntries(formData.entries());
}

export default formatUserDataForm;
