export const validateRegister = (
  name,
  phone,
  password,
  confirmPassword
) => {
  if (
    !name ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    return "All fields are required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

export const validateLogin = (
  phone,
  password
) => {
  if (!phone || !password) {
    return "All fields are required";
  }

  return null;
};