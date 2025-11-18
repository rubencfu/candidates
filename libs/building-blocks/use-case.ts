import { UnknownAny } from '../shared-kernel';

export abstract class UseCase<In, Out> {
  abstract execute(props: In): Promise<Out>;
}

export type GetUseCaseOutput<U extends UseCase<UnknownAny, UnknownAny>> =
  Awaited<ReturnType<U['execute']>>;
