import {
  isEmail,
  shouldBeEqualTo,
  // checkUser,
} from '../BaseForm/extension/vjf';

export default {
  fields: {
    username: {
      label: 'Username',
      placeholder: 'Insert User Name',
      rules: 'checkUser|required|string|between:5,15',
      // validators: [checkUser],
      options: {
        validateOnChange: true,
      },
    },
    email: {
      label: 'Email',
      related: ['emailConfirm'],
      placeholder: 'Insert your Email address',
      rules: 'required|email|string|between:3,80',
    },
    emailConfirm: {
      label: 'Confirm Email',
      placeholder: 'Confirm your Email address',
      validators: [isEmail, shouldBeEqualTo('email')],
      rules: 'required|string|between:3,80',
    },
    password: {
      label: 'Password',
      related: ['passwordConfirm'],
      placeholder: 'Insert your Password',
      rules: 'required|string|between:5,20',
    },
    passwordConfirm: {
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      validators: [shouldBeEqualTo('password')],
      rules: 'required|string|between:5,20',
    },
    firstName: {
      label: 'First Name',
      placeholder: 'John',
      rules: 'required|string|between:1,50',
    },
    lastName: {
      label: 'Last Name',
      placeholder: 'Doe',
      rules: 'required|string|between:1,50',
    },
    gender: {
      label: 'Gender',
      value: 'male',
      extra: ['male', 'female'],
    },
    terms: {
      value: true,
      type: 'checkbox',
      label: 'Accept Terms',
      rules: 'boolean|accepted',
      options: {
        validateOnChange: true,
      },
    },
  },
};
