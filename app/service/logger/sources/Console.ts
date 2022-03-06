/* eslint-disable no-console */
import { Logger } from '../domain';

export class Console implements Logger {
  debug(...args: Array<unknown>): void {
    console.debug(...args);
  }

  info(...args: Array<unknown>): void {
    console.info(...args);
  }

  error(...args: Array<unknown>): void {
    console.error(...args);
  }
}
