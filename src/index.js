import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

render(
  <AppContainer>
    <Root
      store={store}
    />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    /* eslint-disable global-require */
    const RootContainer = require('./containers/Root').default;
    /* eslint-disable global-require */
    render(
      <AppContainer>
        <RootContainer
          store={store}
        />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
