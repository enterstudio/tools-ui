/* eslint-disable complexity */
import _ from 'lodash';
import { setupTree, flatten } from 'helpers/tree';
import makeReducer from 'reducers/makeReducer';

export default makeReducer({
  initialState: {
    root: {}
  },
  types: {
    'SPF_INSPECT_SUCCESS': (state, action) => {
      const tree = setupTree(action.payload.spf_tree);
      const flat = flatten({ node: tree }); // refresh will reset the expand/collapse state, probably fine
      flat.root.expanded = true; // expand just the root to start out
      return flat;
    },
    'SPF_INSPECT_FAIL': (state, action) => ({ root: {} }),
    'SPF_TREE_EXPAND': (state, action) => ({
      ...state,
      [action.payload]: {
        ...state[action.payload],
        expanded: true
      }
    }),
    'SPF_TREE_COLLAPSE': (state, action) => ({
      ...state,
      [action.payload]: {
        ...state[action.payload],
        expanded: false
      }
    }),
    'SPF_TREE_EXPAND_ALL': (state, action) => _.mapValues(state, (node) => ({ ...node, expanded: true })),
    'SPF_TREE_COLLAPSE_ALL': (state, action) => _.mapValues(state, (node) => ({ ...node, expanded: false }))
  }
});
