import { useCallback, useState } from "react";

export function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const runValidation = useCallback(
    (nextValues) => {
      if (typeof validate !== "function") return {};
      return validate(nextValues) || {};
    },
    [validate]
  );

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors(runValidation(values));
    },
    [runValidation, values]
  );

  const handleSubmit = useCallback(
    (onSubmit) => async (event) => {
      event?.preventDefault?.();
      const validationErrors = runValidation(values);
      setErrors(validationErrors);
      setTouched(
        Object.keys(values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      if (Object.keys(validationErrors).length === 0) {
        await onSubmit?.(values);
      }
    },
    [runValidation, values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
