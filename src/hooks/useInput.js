import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'isEmail':
          const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
          regex.test(value) ? setEmailError(false) : setEmailError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, emailError]);

  return { isEmpty, emailError, inputValid };
};

export const useInput = (initionalVlue, validations) => {
  const [value, setValue] = useState(initionalVlue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setIsDirty(true);
  };

  const restartInput = () => {
    setValue('');
    setIsDirty(false);
  };

  return { value, onChange, onBlur, isDirty, restartInput, ...valid };
};
