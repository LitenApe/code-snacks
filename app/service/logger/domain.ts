export interface Logger {
  debug: (...args: Array<unknown>) => void;
  info: (...args: Array<unknown>) => void;
  error: (...args: Array<unknown>) => void;
}
