
const store = function store(key, value) {
  let lsSupport = false;
  let data;
  const noop = () => {};


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

    // Check for native support
  if (typeof localStorage !== 'undefined') {
    lsSupport = true;
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

    return data;
  }

    // Null specified, remove store
  if (value === null) {
    if (lsSupport) { // Native support
      localStorage.removeItem(key);
    } else { // Use cookie
      createCookie(key, '', -1);
    }
  }
  return key;
};


class Storage {

  constructor(prefix = 'simplestore') {
    this._prefix = prefix;
  }

  _getKey(key) {
    return `${this._prefix}:${key}`;
  }

  getItem(key) {
    return store(this._getKey(key));
  }

  setItem(key, value) {
    store(this._getKey(key), value);
    return this;
  }

  removeItem(key) {
    store(this._getKey(key), null);
    return this;
  }
}

export default new Storage();
