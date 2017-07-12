
export default {
  fields: {
    firstName: {
      label: 'First Name',
      placeholder: 'First Name',
      rules: 'required|string|between:1,50',
    },
    lastName: {
      label: 'Last Name',
      placeholder: 'Last Name',
      rules: 'required|string|between:1,50',
    },
  },
};
