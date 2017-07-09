
export default {
  fields: {
    email: {
      label: 'Email',
      placeholder: 'Insert your Email address',
      rules: 'required|email|string|between:3,80',
    },
    password: {
      label: 'Password',
      placeholder: 'Insert your Password',
      rules: 'required|string|between:5,20',
    },
  },
};
