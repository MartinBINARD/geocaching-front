import { oneCircuitResponse } from './circuits.data';

export const userProfileResponse = {
  id: 1,
  circuits: [oneCircuitResponse],
  city: 'Vannes',
  count_finished_circuits: 1,
  email: 'testuser@email.com',
  km_traveled: 3.5,
  presentation: 'Hello world !',
  pseudo: 'testUser',
  region: 'Bretagne',
  role: 'user',
  state: 'Morbihan',
  verified: true,
};

export const userProfileFormEntries = {
  pseudo: 'newTestUser',
  region: 'Île-de-France',
  state: 'Paris',
  city: 'Paris',
  presentation: 'myPresentation',
  email: 'testuser@email.com',
};

export const userProfileFormErrorResponse = {
  name: 'AxiosError',
  message: "Une erreur s'est produite. Veuillez essayer de nouveau.",
};
