import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import reducer from '../Reducer';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../Reducer', () =>
      store.replaceReducer(require('../Reducer').default)
    );
  }

  return store;
}