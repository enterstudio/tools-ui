/* eslint-disable complexity */
import moment from 'moment';
import _ from 'lodash';

const initialState = {
  results: { errors: [], warnings: [], spf_tree: { root: {}} },
  loading: false,
  error: null
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SPF_INSPECT_PENDING': {
      return {
        ...state,
        loading: true
      };
    }

    case 'SPF_INSPECT_SUCCESS': {
      const { errors, warnings, authorized_netblocks, dns_lookups } = action.payload;
      const timestamp = moment().format('MMM D YYYY[, at] h:mm A');
      return {
        ...state,
        results: {
          spfErrors: errors,
          spfWarnings: warnings,
          authorized_netblocks,
          dns_lookups,
          timestamp
        },
        loading: false
      };
    }

    case 'SPF_INSPECT_FAIL': {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case 'SPF_INSPECT_EXPAND': {
      return {
        ...state,
        results: {
          ...state.results,
          spf_tree: {
            ...state.results.spf_tree,
            [action.payload]: {
              ...state.results.spf_tree[action.payload],
              expanded: true
            }
          }
        }
      };
    }

    case 'SPF_INSPECT_COLLAPSE': {
      return {
        ...state,
        results: {
          ...state.results,
          spf_tree: {
            ...state.results.spf_tree,
            [action.payload]: {
              ...state.results.spf_tree[action.payload],
              expanded: false
            }
          }
        }
      };
    }

    case 'SPF_INSPECT_EXPAND_ALL': {
      const { spf_tree } = state.results;
      return {
        ...state,
        results: {
          ...state.results,
          spf_tree: _.mapValues(spf_tree, (node) => ({ ...node, expanded: true }))
        }
      };
    }

    case 'SPF_INSPECT_COLLAPSE_ALL': {
      const { spf_tree } = state.results;
      return {
        ...state,
        results: {
          ...state.results,
          spf_tree: _.mapValues(spf_tree, (node) => ({ ...node, expanded: false }))
        }
      };
    }

  }

  return state;

};

function setupTree(node) {
  const defaults = {
    expanded: true,
    displayType: node.type
  };
  const walked = Object.assign(defaults, node);

  // mx and a records have child records, but no value of their own, flatten them to simplify the tree
  if (node.type === 'mx' || node.type === 'a') {
    return node.children.map((child) => {
      child.displayType = node.type;
      return setupTree(child);
    });
  }

  if (node.children && node.children.length) {
    walked.children = _.flatten(node.children.map(setupTree));
  }

  return walked;
}

function flatten({ top = {}, node, parent = null, id = 'root' }) {
  node.treeId = id;
  if (parent) {
    parent.children.push(id);
  }
  if (node.children) {
    const children = [...node.children];
    node.children = [];
    children.forEach((child, i) => flatten({ top, node: child, parent: node, id: `${id}.${i}` }));
  }
  top[id] = node;
  return top;
}
