export default function debounce<T extends (...args: unknown[]) => void>(
  callback: T,
  wait?: number,
): (...args: Parameters<T>) => void {
  var timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function debounced(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function runLater() {
      callback.apply(null, args);
    }, wait || 250);
  };
}
