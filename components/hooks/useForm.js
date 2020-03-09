import { useState } from "react";

const useForm = (initialState, validate, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onHandleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    callback();
  };

  return {
    values,
    errors,
    onHandleChange,
    onHandleSubmit
  };
};

export default useForm;
