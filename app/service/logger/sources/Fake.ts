import { Logger } from '../domain';

export class Fake implements Logger {
  info(..._args: Array<unknown>): void {}
  error(..._args: Array<unknown>): void {}
}
