/* eslint-disable no-console */
import type { Logg } from '../domain';

class Console implements Logg {
  debug(...args: Array<unknown>): void {
    console.debug(...args);
  }

  info(...args: Array<unknown>): void {
    console.info(...args);
  }

  warn(...args: Array<unknown>): void {
    console.warn(...args);
  }

  error(...args: Array<unknown>): void {
    console.error(...args);
  }
}

export const instance = new Console();
