import BaseTemplate from '../BaseTemplate';

class Template extends BaseTemplate {}

export default {
  Template,
  data: {
    subject: 'Your account was changed. Please verify the changes',
    tokenKey: 'verifyToken',
  },
};
