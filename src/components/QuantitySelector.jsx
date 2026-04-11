import { useEffect, useState } from 'react';

export default function QuantitySelector(props) {
  var value = props.value || 1;
  var min = props.min || 1;
  var max = props.max || 12;
  var onChange = props.onChange;
  var [internalValue, setInternalValue] = useState(value);

  useEffect(
    function syncExternalValue() {
      setInternalValue(value);
    },
    [value]
  );

  function updateValue(nextValue) {
    var parsedValue = Number(nextValue);
    var clampedValue = Math.min(max, Math.max(min, parsedValue || min));
    setInternalValue(clampedValue);

    if (onChange) {
      onChange(clampedValue);
    }
  }

  return (
    <div className="quantity-selector">
      <button className="ghost-button" onClick={function decrease() {
        updateValue(internalValue - 1);
      }}>
        -
      </button>
      <input
        value={internalValue}
        onChange={function handleChange(event) {
          updateValue(event.target.value);
        }}
      />
      <button className="ghost-button" onClick={function increase() {
        updateValue(internalValue + 1);
      }}>
        +
      </button>
    </div>
  );
}
