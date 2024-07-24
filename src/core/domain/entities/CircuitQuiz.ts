interface QuizContentParagraph {
  paragraph: string;
  hint: string | null;
  question: string;
}

interface QuizContentTransition {
  transition: string;
}

type QuizStepContent = [QuizContentParagraph, QuizContentTransition];

export interface CircuitStep {
  id: number;
  latitude: number;
  longitude: number;
  content: QuizStepContent;
}

export type CircuitQuizList = CircuitStep[];
