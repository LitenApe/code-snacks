type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error';
type LoggFunction = (message: string) => void;
type Source = {
  trace: LoggFunction;
  debug: LoggFunction;
  info: LoggFunction;
  warn: LoggFunction;
  error: LoggFunction;
};

const hierarchy = ['trace', 'debug', 'info', 'warn', 'error'];
function mute(environment: Level, current: Level): boolean {
  return hierarchy.indexOf(current) >= hierarchy.indexOf(environment);
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

  private logg(level: Level, ...message: Array<unknown>): void {
    if (!mute(this.#level, level)) {
      this.#src[level](
        `[name=${this.#name}][level=${level}]: ${message.join('. ')}`,
      );
    }
  }

  trace(...args: Array<unknown>): void {
    this.logg('trace', args);
  }

  debug(...args: Array<unknown>): void {
    this.logg('debug', args);
  }

  info(...args: Array<unknown>): void {
    this.logg('info', args);
  }

  warn(...args: Array<unknown>): void {
    this.logg('warn', args);
  }

  error(...args: Array<unknown>): void {
    this.logg('error', args);
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

const loggFactory = factory('warn', new ConsoleAdapter());
const logg = loggFactory('Logg ID');

logg.info(
  "Here is a info logg statement, it will be ignored due to the level argument on line 82, where the environemt logg level has been set to 'warn'",
  'However, if it did output something, it would look something like this: [level=INFO][name=Logg ID]: <...>',
);
