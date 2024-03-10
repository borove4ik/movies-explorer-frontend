import { useState, useCallback } from 'react';

const useFormValidation = () => {
  const [formValid, setFormValid] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const rules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30,
      regExTemplate: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
      errorMessages: {
        emptyField: 'поле должно быть заполнено',
        minLengthError: 'длина имени должна быть больше 2 символов',
        maxLengthError: 'длина имени должна быть до 30 символов',
        templateError: 'в имени допустимо использовать только латиницу, кириллицу, пробел или дефис'
      }
    },
    email: {
      required: true,
      regExTemplate: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      errorMessages: {
        emptyField: 'поле должно быть заполнено',
        templateError: 'некорректный адрес электронной почты'
      },
    },
    password: {
      required: true,
      minLength: 4,
      errorMessages: {
        emptyField: 'поле должно быть заполнено',
        minLengthError: 'длина пароля должна быть больше четырёх'
      }
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const { name, value } = e.target;
    const rule = rules[name];

    let errorMessage = '';

    if (rule.required && value.trim() === '') {
      errorMessage = rule.errorMessages.emptyField;
    } else if (name === 'name') {
      if (value.length < rule.minLength) {
        errorMessage = rule.errorMessages.minLengthError;
      } else if (value.length > rule.maxLength) {
        errorMessage = rule.errorMessages.maxLengthError;
      } else if (!rule.regExTemplate.test(value)) {
        errorMessage = rule.errorMessages.templateError;
      }
    } else if (name === 'email' && !rule.regExTemplate.test(value)) {
      errorMessage = rule.errorMessages.templateError;
    } else if (name === 'password') {
      if (value === '' || !value) {
        errorMessage = rule.errorMessages.emptyField;
      } else if (value.length < 4) {
        errorMessage = rule.errorMessages.minLengthError;
      }
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
    e.target.setCustomValidity(errorMessage);
    setValues({ ...values, [name]: value });
    setFormValid(form.checkValidity());
  };

  const resetForm = useCallback((values = {}, errors = {}, formValid = false) => {
    setValues(values);
    setErrors(errors);
    setFormValid(formValid);
  }, []);

  return {
    values,
    errors,
    formValid,
    handleInputChange,
    resetForm
  };
};

export default useFormValidation

