const indexjs = require('indexjs');

export default indexjs(__dirname, {}, (model) => {
  return model.default;
});
