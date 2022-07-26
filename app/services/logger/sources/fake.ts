import type { Logg } from '../domain';

export class Fake implements Logg {
  debug(..._args: Array<unknown>): void {}

  info(..._args: Array<unknown>): void {}

  warn(..._args: Array<unknown>): void {}

  error(..._args: Array<unknown>): void {}
}
