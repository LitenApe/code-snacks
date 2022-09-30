import type { Logg } from './domain';
import { source } from './sources';

export class Logger implements Logg {
  #name: string;

  #src: Logg;

  constructor(name: string) {
    this.#name = name;
    this.#src = source;
  }

  debug(...args: Array<unknown>): void {
    if (process.env.NODE_ENV === 'development') {
      this.#src.debug(`[name=${this.#name}]`, ...args);
    }
  }

  info(...args: Array<unknown>): void {
    if (process.env.NODE_ENV === 'development') {
      this.#src.info(`[name=${this.#name}]`, ...args);
    }
  }

  warn(...args: Array<unknown>): void {
    this.#src.warn(`[name=${this.#name}]`, ...args);
  }

  error(...args: Array<unknown>): void {
    this.#src.error(`[name=${this.#name}]`, ...args);
  }
}
