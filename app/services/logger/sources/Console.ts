/* eslint-disable no-console */
import { Logger } from '../domain';

class Console implements Logger {
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

export const instance = new Console();
