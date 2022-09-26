function debounce<P extends Array<unknown>>(
  func: (...params: P) => void,
  delay = 300,
): (...params: P) => void {
  let timer: NodeJS.Timeout | undefined;

  return function (...params: P): void {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...params);
      timer = undefined;
    }, delay);
  };
}
