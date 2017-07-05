import cuid from 'cuid';

export default () =>
  function reqContext() {
    const app = this;
    app.use((req, res, next) => {
      req.id = cuid();
      req.app = app;

      /**
       * instead of polluting the req object
       * use the context namespace to store
       * custom values to pass along the middleware chain
       */
      req.context = {
        clientIp: req.clientIp,
        requestId: req.id,
      };
      next();
    });
  };
