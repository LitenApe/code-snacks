export interface Logg {
  debug: (..._args: Array<unknown>) => void;
  info: (..._args: Array<unknown>) => void;
  warn: (..._args: Array<unknown>) => void;
  error: (..._args: Array<unknown>) => void;
}
