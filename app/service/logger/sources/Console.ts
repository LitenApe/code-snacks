import { Logger } from '../domain';

export class Console implements Logger {
  info(...args: Array<unknown>): void {
    console.info(...args);
  }

  error(...args: Array<unknown>): void {
    console.error(...args);
  }
}
