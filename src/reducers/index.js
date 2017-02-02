import { combineReducers } from 'redux';
import spfTreeReducer from './spfTree';
import spfInspectReducer from './spfInspect';

const reducers = {
  spfInspect: combineReducers({
    tree: spfTreeReducer,
    details: spfInspectReducer
  })
};

export default combineReducers(reducers);
