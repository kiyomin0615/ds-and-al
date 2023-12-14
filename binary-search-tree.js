class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    // this.count = 1;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let temp = this.root;

    while (true) {
      if (newNode.value === temp.value) {
        return this;
      }

      if (newNode.value < temp.value) {
        if (temp.left === null) {
          temp.left = newNode;
          return this;
        }

        temp = temp.left;
      } else {
        if (temp.right === null) {
          temp.right = newNode;
          return this;
        }

        temp = temp.right;
      }
    }
  }
}

let bst = new BinarySearchTree();
bst.insert(47);
bst.insert(21);
bst.insert(99);
console.log(bst);
