import { combineReducers } from 'redux';
import authReducer from './auth';
import spfTreeReducer from './spfTree';
import spfInspectReducer from './spfInspect';
import spfHistoryReducer from './spfHistory';

const reducers = {
  auth: authReducer,
  spfInspect: combineReducers({
    tree: spfTreeReducer,
    details: spfInspectReducer
  }),
  spfHistory: spfHistoryReducer
};

export default combineReducers(reducers);
