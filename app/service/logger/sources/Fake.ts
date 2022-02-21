import { Logger } from '../domain';

export class Fake implements Logger {
  debug(..._args: Array<unknown>): void {}
  info(..._args: Array<unknown>): void {}
  error(..._args: Array<unknown>): void {}
}
