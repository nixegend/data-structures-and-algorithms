/*
                      Average   At worst
Memory consumption    O(n)        O(n)
Search                O(log n)    O(n)
Insert                O(log n)    O(n)
Delete                O(log n)    O(n)
*/

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
};

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  add(data) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = function (node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node == null) {
        return null;
      }

      if (data == node.data) {

        // node has no children
        if (node.left == null && node.right == null) {
          return null;
        }

        // node has no left child
        if (node.left == null) {
          return node.right;
        }

        // node has no right child
        if (node.right == null) {
          return node.left;
        }

        // node has two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }

        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }
}

const bst = new BinarySearchTree();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(10);
bst.add(7);
bst.add(20);

console.log('find 6: ', bst.find(6));

bst.remove(7);
console.log('find 7: ', bst.find(7));

bst.add(8);
console.log('find 8: ', bst.find(8));
