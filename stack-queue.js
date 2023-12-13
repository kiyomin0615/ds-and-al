// Array로 Stack을 구현하는 것은 너무나도 간단하다
// Linked List로 Stack을 구현할 때는, Linked List의 Head를 Stack의 Top으로 설정하는 것이 좋다
// Array로 Queue를 구현하는 것보다 Linked List로 구현하는 것이 더 빠르다
// Linked List로 Queue를 구현할 때는, Linked List의 Head를 Queue의 First로, Tail을 Last로 설정하는 것이 좋다
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(value) {
    const newNode = new Node(value);
    this.top = newNode;
    this.height = 1;
  }

  // Linked List의 unshift()와 동일하다
  push(value) {
    const newNode = new Node(value);

    if (this.height === 0) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    
    this.height++;

    return this;
  }

  // Linked List의 shift()와 동일하다
  pop() {
    if (this.height === 0) {
      return;
    }

    let temp = this.top;
    this.top = this.top.next;
    temp.next = null;

    this.height--;

    return temp;
  }
}

class Queue {
  constructor(value) {
    const newNode = new Node(value);
    this.first = newNode;
    this.last = newNode;
    this.length = 1;
  }
}

let stack = new Stack(11);
stack.push(23);
stack.push(9);
stack.push(20);
stack.pop();
stack.pop();
console.log(stack);

let queue = new Queue(4);
console.log(queue);
