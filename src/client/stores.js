import home from './components/Home/HomeStore';
import authManagement from './components/Auth/AuthManagementStore';
/**
 * stores exported here will be accessible in
 * using the inject decorator with the name used
 * in the export object
 * for eg. @inject('home')
 */
export default {
  home,
  authManagement,
};
