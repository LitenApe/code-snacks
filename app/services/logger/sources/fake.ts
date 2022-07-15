import type { Logg } from '../domain';

class Fake implements Logg {
  debug(..._args: Array<unknown>): void {}

  info(..._args: Array<unknown>): void {}

  warn(..._args: Array<unknown>): void {}

  error(..._args: Array<unknown>): void {}
}

export const instance = new Fake();
