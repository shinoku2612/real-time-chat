import { useEffect, useState } from 'react';

export const useRadioInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function changeValueHandler(event) {
    setValue(event.target.value);
  }

  function setNewValue(value) {
    setValue(value);
  }

  return { value, onChange: changeValueHandler, setValue: setNewValue };
};

const useInput = (validateFunction) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const isValid = validateFunction?.(value) ?? true;
  const [isInValid, setIsInValid] = useState(!isValid && isFocus);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsInValid(!isValid && isFocus);
    }, 300);

    return () => clearTimeout(timerId);
  }, [isValid, isFocus]);

  function onChangeHandler(event) {
    setIsFocus(true);
    setValue(event.target.value);
  }

  function onBlurHandler() {
    setIsFocus(true);
  }

  function resetHandler() {
    setValue('');
  }

  function setNewValue(value) {
    setValue(value);
  }

  return {
    state: {
      value,
      isValid,
      isInValid,
    },
    actions: {
      onChange: onChangeHandler,
      onBlur: onBlurHandler,
      reset: resetHandler,
      setValue: setNewValue,
    },
  };
};

export default useInput;
