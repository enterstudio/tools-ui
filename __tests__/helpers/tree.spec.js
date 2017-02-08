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
          children: [
            { value: 'some mx value 0' },
            { value: 'some mx value 1' },
            { value: 'some mx value 2' }
          ]
        },
        {
          type: 'a',
          prefix: '+',
          children: [
            { value: 'some a value 0' },
            { value: 'some a value 1' },
            { value: 'some a value 2' }
          ]
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

    it('should flatten MX and A children', () => {
      const walked = setupTree(tree);
      const mx = walked.children.slice(0, 3);
      const a = walked.children.slice(3, 6);

      expect(walked.children.length).toEqual(7);

      // expect no children of type 'mx' or 'a'
      expect(_.filter(walked.children, { type: 'mx' }).length).toEqual(0);
      expect(_.filter(walked.children, { type: 'a' }).length).toEqual(0);

      expect(mx).toEqual([
        {
          expanded: false,
          displayType: 'mx',
          value: 'some mx value 0'
        },
        {
          expanded: false,
          displayType: 'mx',
          value: 'some mx value 1'
        },
        {
          expanded: false,
          displayType: 'mx',
          value: 'some mx value 2'
        },
      ]);

      expect(a).toEqual([
        {
          expanded: false,
          displayType: 'a',
          value: 'some a value 0'
        },
        {
          expanded: false,
          displayType: 'a',
          value: 'some a value 1'
        },
        {
          expanded: false,
          displayType: 'a',
          value: 'some a value 2'
        },
      ]);

    });

    it('should remove MX and A that have no children', () => {
      delete tree.children[0].children;
      delete tree.children[1].children;

      const walked = setupTree(tree);

      expect(walked.children.length).toEqual(1);

      expect(_.filter(walked.children, { type: 'mx' }).length).toEqual(0);
      expect(_.filter(walked.children, { type: 'a' }).length).toEqual(0);
      expect(_.filter(walked.children, { displayType: 'mx' }).length).toEqual(0);
      expect(_.filter(walked.children, { displayType: 'a' }).length).toEqual(0);
    });

  });

});
