/* eslint-disable complexity */
import _ from 'lodash';
import { setupTree, flatten } from 'helpers/tree';

const initialState = {
  root: {}
};

export default (state = initialState, action = {}) => {

  switch (action.type) {

    case 'SPF_INSPECT_SUCCESS': {
      const tree = setupTree(action.payload.spf_tree);
      const flat = flatten({ node: tree }); // refresh will reset the expand/collapse state, probably fine
      flat.root.expanded = true; // expand just the root to start out
      return flat;
    }

    case 'SPF_INSPECT_FAIL': {
      return initialState;
    }

    case 'SPF_TREE_EXPAND': {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          expanded: true
        }
      };
    }

    case 'SPF_TREE_COLLAPSE': {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          expanded: false
        }
      };
    }

    case 'SPF_TREE_EXPAND_ALL': {
      return _.mapValues(state, (node) => ({ ...node, expanded: true }));
    }

    case 'SPF_TREE_COLLAPSE_ALL': {
      return _.mapValues(state, (node) => ({ ...node, expanded: false }));
    }

  }

  return state;

};
