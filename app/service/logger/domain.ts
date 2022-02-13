export interface Logger {
  info: (...args: Array<unknown>) => void;
  error: (...args: Array<unknown>) => void;
}
