import React from 'react';
import { Provider } from 'mobx-react';
import App from './components/App';
import stores from './stores';
// import { AppContainer } from 'react-hot-loader';

export default () => {
  return (
    <Provider {...stores}>
      <App />
    </Provider>
  );
};
