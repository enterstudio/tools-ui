/* eslint-disable complexity */
import _ from 'lodash';
import { setupTree, flatten } from 'helpers/tree';

const initialState = {
  root: {}
};

export default (state = initialState, action) => {

  switch (action.type) {

    case 'SPF_INSPECT_SUCCESS': {
      const tree = setupTree(action.payload.spf_tree);
      return flatten({ node: tree }); // refresh will reset the expand/collapse state, probably fine
    }

    case 'SPF_INSPECT_FAIL': {
      return initialState;
    }

    case 'SPF_INSPECT_EXPAND': {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          expanded: true
        }
      };
    }

    case 'SPF_INSPECT_COLLAPSE': {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          expanded: false
        }
      };
    }

    case 'SPF_INSPECT_EXPAND_ALL': {
      return _.mapValues(state, (node) => ({ ...node, expanded: true }));
    }

    case 'SPF_INSPECT_COLLAPSE_ALL': {
      return _.mapValues(state, (node) => ({ ...node, expanded: false }));
    }

  }

  return state;

};
