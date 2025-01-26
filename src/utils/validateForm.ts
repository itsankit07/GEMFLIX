import { FormErrors, FormValues } from "../types/formValues";

export const validateForm = (values: FormValues, isloggedIn: boolean): FormErrors => {
  const errors: FormErrors = {};

  if (!isloggedIn) {
    if (!values.name) {
      return { name: "Name is Required" };
    } else if (values.name.length < 4) {
      return { name: "Name must be atleast 4 charachters long" };
    }
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter an valid Email-Id";
  }

  const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  if (!values.password) {
    errors.password = "Password is required!";
  } else if (!passwordRegex.test(values.password)) {
    errors.password = "Password must be 8 charchters long and include an uppercase and one digit";
  }
  return errors;
};
