const defaultConst = require('./default');
const logger = require('./client-logger')('constants');

const env = process && process.env && process.env.NODE_ENV
  ? process.env.NODE_ENV
  : null;
let nextConst = {};

if (env && env !== 'development') {
  const constFile = `./${env}`;
  try {
    nextConst = require(constFile);
  } catch (e) {
    logger.error(e, `could not find  constant file: ${constFile}.js`);
  }
}
const constants = Object.assign({}, defaultConst, nextConst);

export default constants;
