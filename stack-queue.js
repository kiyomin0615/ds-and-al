// Array로 Stack을 구현하는 것은 너무나도 간단하다
// Linked List로 Stack을 구현할 때는, Linked List의 Head를 Stack의 Top으로 설정하는 것이 좋다
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
}

let stack = new Stack(11);
stack.push(23);
stack.push(9);
stack.push(20);
console.log(stack);
