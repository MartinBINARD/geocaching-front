import {
  Circuit,
  CircuitPathStep,
  SearchState,
  StepsEntriesState,
  UserCircuitAnswersResultState,
  UserCircuitEntriesState,
} from '../../domain/entities/circuit';
import circuitsReducer, {
  fetchCircuit,
  fetchCircuitsList,
  initialCircuitsState,
  resetCircuitQuiz,
  resetSearchCircuitsList,
  searchCircuitsList,
  sendAnswers,
  storeCircuitQuiz,
  storeStepEntries,
} from '../../domain/usecases/circuits';
import {
  ciruitsListResponse,
  oneCircuitResponse,
  searchCircuitsListResponse,
  goodSearchEntries,
  wrongSearchEntries,
  oneCircuitQuizResponse,
  oneCircuitStepResponse,
  userCircuitEntriesResponse,
  userCircuitAnswerResultResponse,
  stepsEntriesResponse,
} from '../data/data';

const fakeRequestId = 'fakeRequestId';

jest.mock('../../services/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

describe('Circuits store', () => {
  it('Should return the initial circuits state on first call', () => {
    expect(circuitsReducer(undefined, { type: '@@INIT' })).toBe(
      initialCircuitsState
    );
  });
});

describe('Circuits list state test', () => {
  it('Should GET circuits list', async () => {
    const fakePayload: Circuit[] = ciruitsListResponse;

    const action = fetchCircuitsList.fulfilled(fakePayload, fakeRequestId);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/fetch-circuits-list/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);

    expect(state).toEqual({
      ...initialCircuitsState,
      circuitsList: fakePayload,
    });
    expect(state.circuitsList).toHaveLength(3);

    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to return circuits list', async () => {
    const fakePayload = [] as any;

    const action = fetchCircuitsList.rejected(fakePayload, fakeRequestId);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/fetch-circuits-list/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);

    expect(state).toEqual({
      ...initialCircuitsState,
      circuitsList: fakePayload,
      errorMessage: undefined,
    });
    expect(state.circuitsList).toHaveLength(0);

    expect(state.isLoading).toBeFalsy;
  });
});

describe('Search circuits list state test', () => {
  it('Should SUCCESS to return research on circuits list', async () => {
    const fakePayload: Circuit[] = searchCircuitsListResponse;
    const fakeSearchEntries: SearchState = goodSearchEntries;

    const action = searchCircuitsList(fakeSearchEntries);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/search-circuits-list');
    expect(action.payload).toEqual(fakeSearchEntries);

    expect(state).toEqual({
      ...initialCircuitsState,
      searchList: fakePayload,
      searchSelectorsFilterEntries: fakeSearchEntries.search,
    });
    expect(state.searchList).toHaveLength(2);
  });

  it('Should FAILED to return research on circuits list', async () => {
    const fakePayload: Circuit[] = [];
    const fakeSearchEntries: SearchState = wrongSearchEntries;

    const action = searchCircuitsList(fakeSearchEntries);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/search-circuits-list');
    expect(action.payload).toEqual(fakeSearchEntries);

    expect(state).toEqual({
      ...initialCircuitsState,
      isSearchNoResult: true,
      searchList: fakePayload,
      searchSelectorsFilterEntries: fakeSearchEntries.search,
    });
    expect(state.searchList).toHaveLength(0);
  });
});

describe('Reset search circuits list state test', () => {
  it('Should SUCCESS to return RESET research on circuits list', async () => {
    const action = resetSearchCircuitsList();
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/reset-search-circuits-list');
    expect(action.payload).toEqual(undefined);

    expect(state.isSearchNoResult).toBeFalsy;
    expect(state.searchSelectorsFilterEntries).toBeNull;
    expect(state.searchList).toHaveLength(0);
  });
});

describe('Fetch one circuit state test', () => {
  it('Should GET ONE circuit', async () => {
    const fakePayload: Circuit = oneCircuitResponse;
    const fakeParam = 'circuits/1';

    const action = fetchCircuit.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeParam
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/fetch-circuit/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeParam);

    expect(state).toEqual({
      ...initialCircuitsState,
      oneCircuit: fakePayload,
    });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to return ONE circuit', () => {
    const fakePayload = [] as any;
    const fakeParam = 'circuits/1';

    const action = fetchCircuit.rejected(fakePayload, fakeRequestId, fakeParam);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/fetch-circuit/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeParam);

    expect(state).toEqual({
      ...initialCircuitsState,
      isFetchCircuitFailed: true,
      oneCircuit: null,
    });
    expect(state.isLoading).toBeFalsy;
  });
});

describe('Store circuit quiz state test', () => {
  it('Should SUCESS To store circuit quiz questions', () => {
    const fakePayload: CircuitPathStep[] = oneCircuitStepResponse;

    const action = storeCircuitQuiz(fakePayload);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/store-circuit-quiz');
    expect(action.payload).toEqual(fakePayload);

    expect(state).toEqual({
      ...initialCircuitsState,
      circuitQuiz: oneCircuitQuizResponse,
    });
  });
});

describe('RESET circuit quiz state test', () => {
  it('Should SUCESS to RESET circuit quiz questions', () => {
    const action = resetCircuitQuiz();
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/reset-circuit-quiz');
    expect(action.payload).toEqual(undefined);

    expect(state).toEqual({
      ...initialCircuitsState,
      stepsEntries: null,
      userCircuitAnswersResult: null,
    });
  });
});

describe('Store step entries from circuit quiz state test', () => {
  it('Should SUCESS to store step entries', () => {
    const fakePayload: StepsEntriesState = stepsEntriesResponse;
    const action = storeStepEntries(fakePayload);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/store-steps-entries');
    expect(action.payload).toEqual(fakePayload);

    expect(state).toEqual({
      ...initialCircuitsState,
      stepsEntries: fakePayload,
    });
  });
});

describe('Send user answers from circuit quiz state test', () => {
  it('Should SUCCESS to send user answers', async () => {
    const fakePayload: UserCircuitAnswersResultState =
      userCircuitAnswerResultResponse;
    const fakeEntries: UserCircuitEntriesState = userCircuitEntriesResponse;

    const action = sendAnswers.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/send-answers/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual({
      ...initialCircuitsState,
      userCircuitAnswersResult: fakePayload,
    });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAILED to send user answers', async () => {
    const fakePayload = null;
    const fakeEntries: UserCircuitEntriesState = userCircuitEntriesResponse;

    const action = sendAnswers.rejected(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/send-answers/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error).toEqual({ message: 'Rejected' });

    expect(state).toEqual({
      ...initialCircuitsState,
      userCircuitAnswersResult: null,
    });
    expect(state.isLoading).toBeFalsy;
  });
});
