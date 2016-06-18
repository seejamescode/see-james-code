import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../Reducer';
import thunk from 'redux-thunk';

const enhancer = compose(
  applyMiddleware(thunk)
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