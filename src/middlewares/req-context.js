import cuid from 'cuid';

export default () => {
  return function reqContext() {
    const app = this;
    app.use((req, res, next) => {
      req.id = cuid();
      req.app = app;

      /**
   * instead of polluting the req object
   * use the appContext namespace to store
   * custom values to pass along the middleware chain
   */
      req.appContext = {
        logContext: {
          clientIp: req.clientIp,
          reqId: req.id,
        },
      };
      next();
    });
  };
};
