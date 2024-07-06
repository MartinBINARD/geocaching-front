import { UserCircuitEntriesState } from '../../domain/entities/circuit';

function formatUserCircuitEntries(userCircuitEntries: UserCircuitEntriesState) {
  const { userId, circuitId, stepsEntries } = userCircuitEntries;

  const formatedArrayStepEntries = Object.values(stepsEntries).map(
    (value, index) => ({
      id_step: index + 1,
      answer: parseInt(value as string, 10),
    })
  );

  return {
    id_user: userId,
    id_circuit: circuitId,
    steps: formatedArrayStepEntries,
  };
}

export default formatUserCircuitEntries;
