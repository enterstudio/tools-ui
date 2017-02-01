import { combineReducers } from 'redux';
import spfInspectReducer from './spfInspect';

const reducers = {
  spfInspect: spfInspectReducer
};

export default combineReducers(reducers);
