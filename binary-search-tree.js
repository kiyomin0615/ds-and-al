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

  contains(value) {
    if (this.root === null) {
      return false;
    }

    let temp = this.root;

    while (temp) {
      if (value < temp.value) {
        temp = temp.left;
      } else if (value > temp.value) {
        temp = temp.right;
      } else {
        return true;
      }
    }

    return false;
  }

  minValueNode(currentNode) {
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  // Breadth First Search
  // BFS는 예약제 방식으로, 큐(queue)를 활용한다
  BFS() {
    let currentNode = this.root;
    let queue = [];
    let results = [];

    // 예약
    queue.push(currentNode);

    while (queue.length) {
      // 방문
      currentNode = queue.shift();
      results.push(currentNode.value);

      if (currentNode.left) {
        // 예약
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        // 예약
        queue.push(currentNode.right);
      }
    }

    return results;
  }

  // Depth First Search
  // DFS는 재귀를 활용한다
  // Pre-Order: Root - Left - Right
  // In-Order: Left - Root - Right
  // Post-Order: Left - Right - Root
  DFSPreOrder() {
    let results = [];

    // recursive
    function traverse(currentNode) {
      results.push(currentNode.value);
      if (currentNode.left) {
        traverse(currentNode.left);
      }
      if (currentNode.right) {
        traverse(currentNode.right);
      }
    }

    traverse(this.root);

    return results;
  }

  DFSInOrder() {
    let results = [];

    // recursive
    function traverse(currentNode) {
      if (currentNode.left) {
        traverse(currentNode.left);
      }
      results.push(currentNode.value);
      if (currentNode.right) {
        traverse(currentNode.right);
      }
    }

    traverse(this.root);

    return results;
  }
}

let bst = new BinarySearchTree();
bst.insert(47);
bst.insert(21);
bst.insert(99);
bst.insert(18);
bst.insert(27);
bst.insert(52);
bst.insert(82);
console.log(bst.contains(5));
console.log(bst.minValueNode(bst.root));
console.log(bst.BFS());
console.log(bst.DFSPreOrder());
console.log(bst.DFSInOrder());
console.log(bst);
