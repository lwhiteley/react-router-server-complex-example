import AuthManagement from 'feathers-authentication-management/lib/client';

import rest from './rest-client';

export default new AuthManagement(rest);
