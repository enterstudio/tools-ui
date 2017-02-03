import { combineReducers } from 'redux';
import authReducer from './auth';
import spfTreeReducer from './spfTree';
import spfInspectReducer from './spfInspect';

const reducers = {
  auth: authReducer,
  spfInspect: combineReducers({
    tree: spfTreeReducer,
    details: spfInspectReducer
  })
};

export default combineReducers(reducers);
