import { setupTree, flatten } from 'helpers/tree';
import _ from 'lodash';

describe('helpers: tree', () => {

  let tree;

  beforeEach(() => {
    tree = {
      record: 'root',
      status: 'valid',
      children: [
        {
          type: 'mx',
          prefix: '+',
          value: 'some mx value 0'
        },
        {
          type: 'a',
          prefix: '+',
          value: 'some a value 0'
        },
        {
          type: 'include',
          prefix: '+',
          value: 'somehost.com',
          children: [
            {
              type: 'ip4',
              prefix: '+',
              value: '1.2.3.4'
            }
          ]
        }
      ]
    };
  });

  describe('setupTree', () => {

    it('should set all nodes to expanded false', function() {
      const walked = setupTree(tree);
      expectExpanded(walked);

      function expectExpanded(node) {
        expect(node.expanded).toEqual(false);
        _.forEach(node.children, expectExpanded)
      }
    });
  });

});
