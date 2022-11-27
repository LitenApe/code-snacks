/* eslint-disable no-console */

import type { Source } from 'dirty-kitchen/lib/logger';

export class Console implements Source {
  trace(...args: Array<unknown>): void {
    console.trace('[level=TRACE]', ...args);
  }

  debug(...args: Array<unknown>): void {
    console.debug('[level=DEBUG]', ...args);
  }

  info(...args: Array<unknown>): void {
    console.info('[level=INFO]', ...args);
  }

  warn(...args: Array<unknown>): void {
    console.warn('[level=WARN]', ...args);
  }

  error(...args: Array<unknown>): void {
    console.error('[level=ERROR]', ...args);
  }
}
