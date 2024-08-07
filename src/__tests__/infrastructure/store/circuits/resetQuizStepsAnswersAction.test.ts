import circuitsReducer, {
  initialCircuitsState,
} from '../../../../infracstructure/store/reducers/circuits';
import { resetQuizStepsAnswersAction } from '../../../../infracstructure/store/actions';

jest.mock('../../../../infracstructure/config/axios', () => ({
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

describe('RESET circuit quiz state test', () => {
  it('Should SUCCEED to RESET circuit quiz questions', () => {
    const action = resetQuizStepsAnswersAction();
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/reset-circuit-quiz');
    expect(action.payload).toEqual(undefined);

    expect(state).toEqual({
      ...initialCircuitsState,
      quizStepsAnswers: null,
    });
  });
});
