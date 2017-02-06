import _ from 'lodash';

export function setupTree(node) {
  const defaults = {
    expanded: false, // default everything to collapsed, expand root later
    displayType: node.type
  };
  const walked = Object.assign(defaults, node);

  // mx and a records may have child records, but no value of their own, flatten them to simplify the tree
  if (node.type === 'mx' || node.type === 'a') {
    // node.children may be undefined, _.map will return an empty array, _.flatten will remove that empty array later
    return _.map(node.children, (child) => {
      child.displayType = node.type;
      return setupTree(child);
    });
  }

  if (node.children && node.children.length) {
    walked.children = _.flatten(node.children.map(setupTree));
  }

  return walked;
}

export function flatten({ top = {}, node, parent = null, id = 'root' }) {
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
