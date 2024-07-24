export const formToObject = (form: HTMLFormElement) =>
  Object.fromEntries(new FormData(form).entries());
