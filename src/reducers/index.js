import { combineReducers } from 'redux';
<<<<<<< HEAD
import authReducer from './auth';
=======
>>>>>>> FAD-4332 refactored the redux flow into 2 reducers and a tree helper
import spfTreeReducer from './spfTree';
import spfInspectReducer from './spfInspect';

const reducers = {
<<<<<<< HEAD
  auth: authReducer,
=======
>>>>>>> FAD-4332 refactored the redux flow into 2 reducers and a tree helper
  spfInspect: combineReducers({
    tree: spfTreeReducer,
    details: spfInspectReducer
  })
};

export default combineReducers(reducers);
