import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/';
import middleware from '../middleware';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk, ...middleware));

export default store;