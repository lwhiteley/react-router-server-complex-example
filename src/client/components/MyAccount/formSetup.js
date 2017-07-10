
export default {
  fields: {
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
  },
};
