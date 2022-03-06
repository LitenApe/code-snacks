import { Console } from './sources/Console';
import { Fake } from './sources/Fake';
import { Logger } from './domain';

export class Log implements Logger {
  #name: string;

  #src: Logger;

  constructor(name: string) {
    this.#name = name;
    this.#src = process.env.NODE_ENV === 'development' ? new Console() : new Fake();
  }

  debug(...args: Array<unknown>): void {
    this.#src.debug(`[name=${this.#name}]`, ...args);
  }

  info(...args: Array<unknown>): void {
    this.#src.info(`[name=${this.#name}]`, ...args);
  }

  error(...args: Array<unknown>): void {
    this.#src.error(`[name=${this.#name}]`, ...args);
  }
}
