import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import DevTools from '../DevTools';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }
}