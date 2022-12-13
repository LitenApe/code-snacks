type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error';
type LogFunction = (message: string) => void;
type Source = {
  trace: LogFunction;
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
};

const hierarchy = ['trace', 'debug', 'info', 'warn', 'error'];
function mute(environment: Level, current: Level): boolean {
  return hierarchy.indexOf(environment) <= hierarchy.indexOf(current);
}

export class Logger {
  #name: string;
  #src: Source;
  #level: Level;

  constructor(name: string, level: Level, src: Source) {
    this.#name = name;
    this.#src = src;
    this.#level = level;
  }

  private log(level: Level, ...message: Array<unknown>): void {
    if (!mute(this.#level, level)) {
      this.#src[level](
        `[name=${this.#name}][level=${level}]: ${message.join('. ')}`,
      );
    }
  }

  trace(...args: Array<unknown>): void {
    this.log('trace', args);
  }

  debug(...args: Array<unknown>): void {
    this.log('debug', args);
  }

  info(...args: Array<unknown>): void {
    this.log('info', args);
  }

  warn(...args: Array<unknown>): void {
    this.log('warn', args);
  }

  error(...args: Array<unknown>): void {
    this.log('error', args);
  }
}

class ConsoleAdapter implements Source {
  trace(message: string): void {
    console.info(`[level=TRACE]${message}`);
  }

  debug(message: string): void {
    console.info(`[level=DEBUG]${message}`);
  }

  info(message: string): void {
    console.info(`[level=INFO]${message}`);
  }

  warn(message: string): void {
    console.info(`[level=WARN]${message}`);
  }

  error(message: string): void {
    console.info(`[level=ERROR]${message}`);
  }
}

export function factory(level: Level, src: Source): (name: string) => Logger {
  return (name: string): Logger => new Logger(name, level, src);
}

const logFactory = factory('warn', new ConsoleAdapter());
const log = logFactory('Log ID');

log.info(
  "Here is a info log statement, it will be ignored due to the level argument on line 82, where the environemt log level has been set to 'warn'",
  'However, if it did output something, it would look something like this: [level=INFO][name=Logg ID]: <...>',
);
