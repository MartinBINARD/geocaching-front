export interface Mapper<T, K = object, B = boolean> {
  toDomain(raw: K | B): T;
  fromDomain?(t: T): K;
}
