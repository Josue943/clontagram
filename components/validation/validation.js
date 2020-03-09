export const registerValidation = values => {
  let errors = {};
  if (values.username.trim() === "") {
    errors.username = "Username is required";
  }

  if (values.email.trim() === "") {
    errors.email = "Email is required";
    //con esto sabes si lo contiene
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }

  if (values.password.trim() === "") {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const loginValidation = values => {
  let errors = {};
  if (values.email.trim() === "") {
    errors.email = "Email is required";
    //con esto sabes si lo contiene
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }
  if (values.password.trim() === "") {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};

export const postValidate = values => {
  let errors = {};
  if (values.description.trim() === "") {
    errors.description = "Description is required";
    //con esto sabes si lo contiene
  }
  return errors;
};

export const profileValidate = values => {
  let errors = {};
  if (values.description.trim() === "") {
    errors.description = "Description is required";
    //con esto sabes si lo contiene
  }

  if (values.fullName.trim() === "") {
    errors.fullName = "Name is required";
    //con esto sabes si lo contiene
  }
  return errors;
};
