import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducer';

const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer);
}
