interface Step {
  id: number;
  hint: string | null;
  latitude: number;
  longitude: number;
  paragraph: string;
  question: string;
  transition: string;
}

export type GetCircuitQuizRequest = Step[];
