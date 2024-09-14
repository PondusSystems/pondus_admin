const yup = require('yup');

const registerSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().email('Invalid email address').trim().required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').trim().required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});

const updateUserInfoSchema = yup.object().shape({
  name: yup.string().trim(),
  email: yup.string().email('Invalid email address').trim(),
  password: yup.string().trim(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserInfoSchema,
};
