import BaseTemplate from '../BaseTemplate';

class Template extends BaseTemplate {}

export default {
  Template,
  data: {
    subject: 'Reset Password',
    tokenKey: 'resetToken',
  },
};
