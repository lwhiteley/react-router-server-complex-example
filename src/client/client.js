import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { ServerStateProvider } from 'react-router-server';
import { AppContainer } from 'react-hot-loader';
import App from './app';
// preload,
const mountApp = document.getElementById('main');

// preload(__INITIAL_MODULES__)
//   .then(() => {
//     render((
//       <ServerStateProvider state={__INITIAL_STATE__}>
//         <BrowserRouter>
//           <AppContainer>
//             <App />
//           </AppContainer>
//         </BrowserRouter>
//       </ServerStateProvider>
//     ), mountApp);

//     // For hot reloading of react components
//   });

const renderClient = (Component) => {
  render(
    <AppContainer>
      <ServerStateProvider state={__INITIAL_STATE__}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </ServerStateProvider>
    </AppContainer>,
    mountApp
  );
};

renderClient(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    // const NextApp = require('./app').default; // eslint-disable-line global-require
    renderClient(App);
  });
}
