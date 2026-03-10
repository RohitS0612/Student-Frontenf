import { useState } from 'react';

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const reset = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
  };

  const runSubmit = async (onSubmit) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      return await onSubmit(values);
    }
    return { success: false, validationError: true };
  };

  return {
    values,
    errors,
    handleChange,
    reset,
    runSubmit,
    setValues
  };
};
