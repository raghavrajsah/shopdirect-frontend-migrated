import { useEffect, useState } from 'react';

interface QuantitySelectorProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function QuantitySelector(props: QuantitySelectorProps): React.JSX.Element {
  var value = props.value || 1;
  var min = props.min || 1;
  var max = props.max || 12;
  var onChange = props.onChange;
  var [internalValue, setInternalValue] = useState<number>(value);

  useEffect(
    function syncExternalValue() {
      setInternalValue(value);
    },
    [value]
  );

  function updateValue(nextValue: number | string): void {
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
        onChange={function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
