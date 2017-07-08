import resendVerifySignup from './resend-verify-signup';
import verifySignup from './verify-signup';
import identityChange from './identity-change';
import passwordChange from './password-change';
import resetPwd from './reset-pwd';
import sendResetPwd from './send-reset-pwd';

const Handlers = {
  resendVerifySignup,
  verifySignup,
  identityChange,
  passwordChange,
  resetPwd,
  sendResetPwd,
};

export default Handlers;
