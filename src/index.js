import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './roots/Root';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);
