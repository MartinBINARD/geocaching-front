export const getProfileResponse = {
  id: 2,
  circuits: [
    {
      id: 1,
      name: 'Carnac',
      description: 'Venez découvrir Carnac, la ville aux 3000 menhirs !',
      url_reward: 'random_image.svg',
      url_image: 'random_image.webp',
    },
  ],
  city: null,
  count_finished_circuits: 1,
  email: 'test@email.com',
  km_traveled: 5,
  presentation: null,
  pseudo: 'test',
  region: null,
  role: 'member',
  state: null,
  verified: true,
};

export const getProfileError = {
  name: 'AxiosError',
  message: "Profil d'utilisateur non trouvé.",
};

export const userProfileFormEntries = {
  pseudo: 'newTestUser',
  region: 'Île-de-France',
  state: 'Paris',
  city: 'Paris',
  presentation: 'myPresentation',
  email: 'testuser@email.com',
};

export const userProfileFormError = {
  name: 'AxiosError',
  message: "Aucun utilisateur n'a été trouvé.",
};
