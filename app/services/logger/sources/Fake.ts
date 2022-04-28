/* eslint-disable no-unused-vars */
import { Logger } from '../domain';

class Fake implements Logger {
  debug(..._args: Array<unknown>): void {}

  info(..._args: Array<unknown>): void {}

  error(..._args: Array<unknown>): void {}
}

export const instance = new Fake();
