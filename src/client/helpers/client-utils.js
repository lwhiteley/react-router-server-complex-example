/**
 * Created by layton on 7/10/17.
 */
import storage from './simple-storage';
import constants from '../constants';

const logoutHandler = () => {
  return () => {
    storage.removeItem(constants.storageKeys.currentUser);
  };
};

export default {
  logoutHandler,
};
