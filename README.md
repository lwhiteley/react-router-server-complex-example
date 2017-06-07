React Router v4 Server-Side Rendering Example
=============================

## Major Components

- [React](https://facebook.github.io/react/)
- [react-router v4](https://reacttraining.com/react-router/web/guides/quick-start)
- [mobx](https://github.com/mobxjs/mobx)
- [mobx-react](https://github.com/mobxjs/mobx-react)
- [mongoose](http://mongoosejs.com/)
- [express-restify-mongoose](https://florianholzapfel.github.io/express-restify-mongoose)
- [webpack](https://webpack.github.io/)

## Noteworthy Configuration

### Rest Configuration

It is possible to globally configure the rest components using the general [config file](src/config.js).
Please the the [options reference](https://florianholzapfel.github.io/express-restify-mongoose/#reference) for [express-restify-mongoose](https://florianholzapfel.github.io/express-restify-mongoose)

eg. 

```js
const config = {
    ...
    rest: {
        prefix: 'api'
    }
}
```

*Per Model* configuration is done by convention in each model file. An example can be seen in the [Customer](src/api/models/customer.js) model file
