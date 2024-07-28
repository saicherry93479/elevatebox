// useInput.js
import { useState, useCallback } from "react";

const useInput = (initialValue = "", validator: any) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (e: any) => {
      console.log("changed ", e.target.value);
      const newValue = e.target.value;
      setValue(newValue);
      if (isTouched && validator) {
        const validationResult = validator(newValue);
        setError(validationResult || "");
      }
    },
    [isTouched, validator]
  );

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    if (validator) {
      const validationResult = validator(value);
      setError(validationResult || "");
    }
  }, [value, validator]);

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    error,
    isTouched,
  };
};

export default useInput;
