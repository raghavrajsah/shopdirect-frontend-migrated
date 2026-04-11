export default function debounce(callback, wait) {
  var timeoutId;

  return function debounced() {
    var args = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function runLater() {
      callback.apply(null, args);
    }, wait || 250);
  };
}
