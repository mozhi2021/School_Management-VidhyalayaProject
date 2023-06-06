import React, { useState } from "react";

export function useForm(initialFormValues, validateOnChange = false, validate) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  return {
    formValues,
    setFormValues,
    errors,
    setErrors,
    handleInputChange,
  };
}

export function Form(props) {
  const { children, ...other } = props;
  return (
    <form className="formpageContent" {...other}>
      {props.children}
    </form>
  );
}
