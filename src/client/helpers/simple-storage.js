import unescape from 'lodash/unescape';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';

const store = function store(key, value, defaultVal, clear) {
  let lsSupport = false;
  let data;
  const prefix = this._prefix;
  const noop = () => {};

  const getCookies = () => {
    const pairs = document.cookie.split(';');
    const cookies = {};
    pairs.forEach((keyValuePair) => {
      const pair = keyValuePair.split('=');
      cookies[pair[0]] = unescape(pair[1]);
    });
    return cookies;
  };

    /**
     * Creates new cookie or removes cookie with negative expiration
     * @param  key       The key or identifier for the store
     * @param  value     Contents of the store
     * @param  exp       Expiration - creation defaults to 30 days
     */

  function createCookie(cookieKey, cookieValue, exp) {
    const date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    const expires = `; expires=${date.toGMTString()}`;
    document.cookie = `${cookieKey}=${cookieValue}${expires}; path=/`;
    return document;
  }

    /**
     * Returns contents of cookie
     * @param  key       The key or identifier for the store
     */

  function readCookie(cookieKey) {
    const nameEQ = `${cookieKey}=`;
    const ca = document.cookie.split(';');
    // eslint-disable-next-line no-plusplus
    for (let i = 0, max = ca.length; i < max; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function removeItem(storeKey, storeVal) {
    // Null specified, remove store
    if (storeVal === null) {
      return lsSupport
            ? localStorage.removeItem(storeKey)
            : createCookie(storeKey, '', -1);
    }
    return null;
  }

  function getStore() {
    const usedStore = lsSupport ? localStorage : getCookies();
    return usedStore;
  }

  function clearItems() {
    const usedStore = getStore();
    forEach(Object.keys(usedStore), (storeKey) => {
      if (includes(storeKey, prefix)) {
        removeItem(storeKey, null);
      }
    });
    return null;
  }

    // Check for native support
  if (typeof localStorage !== 'undefined') {
    lsSupport = true;
  }


  if (clear) {
    return clearItems();
  }

    // If value is detected, set new or modify store
  if (typeof value !== 'undefined' && value !== null) {
        // Convert object values to JSON
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
        // Set the store
    if (lsSupport) { // Native support
      localStorage.setItem(key, value);
    } else { // Use Cookie
      createCookie(key, value, 30);
    }
  }

  // No value supplied, return value
  if (typeof value === 'undefined') {
        // Get value
    if (lsSupport) { // Native support
      data = localStorage.getItem(key);
    } else { // Use cookie
      data = readCookie(key);
    }

    // Try to parse JSON...
    try {
      data = JSON.parse(data);
    } catch (e) {
      noop(data);
    }

    return data || defaultVal;
  }

  removeItem(key, value);
  return key;
};


class Storage {

  constructor(prefix = 'simplestore') {
    this._prefix = prefix;
    this.store = store.bind(this);
  }

  _getKey(key) {
    return `${this._prefix}:${key}`;
  }

  getItem(key, defaultVal) {
    return this.store(this._getKey(key), undefined, defaultVal);
  }

  setItem(key, value) {
    this.store(this._getKey(key), value);
    return this;
  }

  removeItem(key) {
    this.store(this._getKey(key), null);
    return this;
  }

  clear() {
    this.store(null, null, null, true);
    return this;
  }
}

export default new Storage();
