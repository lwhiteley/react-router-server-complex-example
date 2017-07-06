import { observable, action } from 'mobx';
import AuthManagement from 'feathers-authentication-management/lib/client';

import rest from '../../helpers/rest-client';

const authManagement = new AuthManagement(rest);

class AuthManagementStore {
  @observable loading = true;
  @observable emailVerified = false;
  @observable error = null;

  @observable user = null;

  @action verifySignupLong(verifyToken) {
    return authManagement
      .verifySignupLong(verifyToken)
      .then((result) => {
        this.emailVerified = result.isVerified;
        this.user = result;
        this.loading = false;
        return result;
      })
      .catch((err) => {
        this.error = err;
        this.loading = false;
        return err;
      });
  }
}

export default new AuthManagementStore();
