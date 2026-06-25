export const validateFullName = (name) => {
  if (!name || name.trim().length === 0) return 'Full name is required.';
  if (name.trim().length < 2) return 'Name must be at least 2 characters.';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) return 'Phone number is required.';
  const phoneRegex = /^(\+92|0)3[0-9]{9}$/;
  if (!phoneRegex.test(phone.trim())) {
    return 'Enter a valid Pakistani number (e.g. 03001234567).';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.length === 0) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return null;
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};