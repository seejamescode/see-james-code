import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <Root store={{store}} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
         <NextApp store={{store}} />
      </AppContainer>,
      rootEl
    );
  });
}