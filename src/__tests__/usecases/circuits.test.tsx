import { RootState } from '../../store';
import { fetchCircuitsList } from '../../domain/usecases/circuits';

jest.mock('../../services/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

const circuitsList = [
  {
    id_circuit: 1,
    name: 'Carnac',
    parking_address: 'Parking Devallen, chemin du tumulus',
    description: 'Venez découvrir Carnac, la ville aux 3000 menhirs !',
    maintenance: false,
    introduction:
      'Bienvenue à Carnac ! La commune est très connue pour ses nombreux vestiges de la préhistoire et notamment ses presque 3000 menhirs (« pierre longue » en breton) dressés et alignés dans les champs. Ce sont des hommes qui vivaient là il y a plusieurs milliers d’années, jusqu’à 6000 ans avant nous, qui les ont construits à une période qu’on appelle aujourd’hui « Néolithique » !\nCommençons notre balade !',
    distance: 5,
    latitude: 47.586445,
    longitude: -3.07405,
    url_image: 'http://localhost:3000/images/carnac-image.webp',
    theme: 'Préhistoire',
    difficulty: 2,
    terrain: 1,
    city: 'Carnac',
    state: 'Morbihan',
    region: 'Bretagne',
    duration: '2h-3h',
    mobility: ['À pied', 'À vélo', 'Poussette'],
    url_reward: 'http://localhost:3000/images/undefined',
  },
  {
    id_circuit: 2,
    name: 'Saint-Pol-de-Léon',
    parking_address: 'Square du 19 Mars 1962',
    description:
      'Parcours l’ancienne capitale de l’évêché de Léon pour découvrir son patrimoine religieux !',
    maintenance: false,
    introduction:
      'Bienvenue à Saint-Pol-de-Léon, ancienne cité épiscopale, capitale de l’évêché de Léon. Ce dernier fusionne en 1790 avec celui de Cornouaille pour former le diocèse de Quimper et Léon. Cette situation confère néanmoins à la commune une richesse indéniable, notamment grâce à son patrimoine religieux ! Laisse-toi guider à travers les rues et ruelles pour le découvrir !',
    distance: 4,
    latitude: 48.681685,
    longitude: -3.98281,
    url_image: 'http://localhost:3000/images/saint-pol-de-leon-image.webp',
    theme: 'Patrimoine Religieux',
    difficulty: 1,
    terrain: 1,
    city: 'Saint-Pol-de-Léon',
    state: 'Finistère',
    region: 'Bretagne',
    duration: '1h-2h',
    mobility: ['À pied', 'À vélo'],
    url_reward: 'http://localhost:3000/images/undefined',
  },
  {
    id_circuit: 3,
    name: 'Chantilly',
    parking_address: "Parking de la gare, 2A rue d'Orgemont",
    description:
      'Explore les curiosités de Chantilly et découvre son histoire !',
    maintenance: false,
    introduction:
      'Chantilly est très connue pour son château, son hippodrome, mais également pour sa célèbre crème fouettée ! La ville doit son développement du 15 ème au 17 ème siècle à la famille de Montmorency, puis ensuite à la famille de Condé, apparentée à la famille des Bourbons qui ont régné sur plusieurs pays d’Europe !',
    distance: 3,
    latitude: 49.188224,
    longitude: 2.459956,
    url_image: 'http://localhost:3000/images/chantilly-image.webp',
    theme: 'Curiosités',
    difficulty: 1,
    terrain: 1,
    city: 'Chantilly',
    state: 'Oise',
    region: 'Haut-de-France',
    duration: "moins d'1h",
    mobility: ['À pied', 'À vélo', 'Poussette'],
    url_reward: 'http://localhost:3000/images/undefined',
  },
];

describe('circuit function', () => {
  it('should GET circuits list', async () => {
    const dispatch = jest.fn();
    const state: RootState = {
      circuits: {
        circuitsList: circuitsList,
        searchSelectorsFilterEntries: null,
        searchList: [],
        isSearchNoResult: false,
        errorMessage: undefined,
        oneCircuit: null,
        circuitQuiz: [],
        stepsEntries: null,
        userCircuitAnswersResult: null,
        isLoading: false,
        isFetchCircuitFailed: false,
      },
      auth: {
        user: null,
        loginErrorMessage: null,
        isRegistered: null,
        registerErrorMessage: '',
        isAccountConfirmed: false,
        isReset: false,
        isLoading: false,
      },
      user: {
        profile: null,
        isProfileLoading: false,
        errorMessage: null,
        isUpdateLoading: false,
        isProfileDelete: false,
      },
    };

    const thunk = fetchCircuitsList();
    await thunk(dispatch, () => state, undefined);
    console.log(dispatch.mock.calls);
  });
});
