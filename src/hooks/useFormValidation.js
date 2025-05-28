import { useState, useCallback } from 'react';
import { validateEmail, validatePassword, validateConfirmPassword } from '../util/CommonUtils';

const useFormValidation = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleEmailChange = useCallback((e) => {
    const email = e.target.value;
    setValues(prev => ({ ...prev, email }));
    setErrors(prev => ({ ...prev, email: validateEmail(email) }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const password = e.target.value;
    setValues(prev => ({ ...prev, password }));
    setErrors(prev => ({
      ...prev,
      password: validatePassword(password),
      confirmPassword: values.confirmPassword ? validateConfirmPassword(password, values.confirmPassword) : ''
    }));
  }, [values.confirmPassword]);

  const handleConfirmPasswordChange = useCallback((e) => {
    const confirmPassword = e.target.value;
    setValues(prev => ({ ...prev, confirmPassword }));
    setErrors(prev => ({
      ...prev,
      confirmPassword: validateConfirmPassword(values.password, confirmPassword)
    }));
  }, [values.password]);

  const isValid = () => {
    return !errors.email && !errors.password && !errors.confirmPassword &&
      values.email && values.password;
  };

  const reset = () => {
    setValues({ email: '', password: '', confirmPassword: '' });
    setErrors({ email: '', password: '', confirmPassword: '' });
  };

  return {
    values,
    errors,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    isValid,
    reset,
  };
};

export default useFormValidation;