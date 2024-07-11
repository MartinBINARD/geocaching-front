export interface DomainErrorDTO {
  type: string;
  message?: string;
  details?: any;
  errorEnumType?: any;
}

export type Either<E, D> = Failure<E> | Success<D>;
export type ErrorOr<T> = Either<DomainErrorDTO, T>;

export interface Failure<E> {
  type: 'failure';
  error: E;
}

export interface Success<D> {
  type: 'success';
  value: D;
}

export function fail<E>(error: E): Failure<E> {
  console.warn('[ERROR]', error);
  return { type: 'failure', error };
}

export function ok<D>(value: D): Success<D> {
  return { type: 'success', value };
}

export const Result = {
  fail,
  ok,
};
