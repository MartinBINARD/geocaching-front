import { EmailForm } from '../../entities/auth';
import { UpdateProfileForm } from '../../entities/user';

function setLowerCaseEmail(formData: EmailForm) {
  const emailInput = formData.get('email');
  const emailToLowerCase = emailInput.toLowerCase();

  return formData.set('email', emailToLowerCase);
}

function formatUserDataForm(form: EmailForm | UpdateProfileForm) {
  const formData = new FormData(form);

  const formDataToLowerCase = setLowerCaseEmail(
    formData as unknown as EmailForm
  );

  return Object.fromEntries(formDataToLowerCase.entries());
}

export default formatUserDataForm;
