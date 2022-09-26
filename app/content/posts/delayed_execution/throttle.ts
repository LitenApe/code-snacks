function throttle<P extends Array<unknown>>(
  func: (...params: P) => void,
  delay = 300,
) {
  let timer: NodeJS.Timeout | undefined;

  return function (...params: P) {
    if (timer === undefined) {
      func(...params);

      timer = setTimeout(() => {
        timer = undefined;
      }, delay);
    }
  };
}
