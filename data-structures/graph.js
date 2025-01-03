// Graph를 표현하는 방법은 크게 Adjacency Matrix와 Adjacency List로 2가지 존재한다
// 공간 복잡도 측면에서 Adjacency Matrix는 너무나도 비효율적이다
// 단, 그래프에 가중치가 있으면 Adjacency Matrix를 사용하는 것이 더 좋다
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
      return true;
    }

    return false;
  }

  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
      return true;
    }

    return false;
  }

  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (vertex) => vertex !== vertex1
      );
      return true;
    }

    return false;
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return null;
    }

    while (this.adjacencyList[vertex].length) {
      let temp = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, temp);
    }

    // delete operator removes a given property from an object
    delete this.adjacencyList[vertex];

    return this;
  }
}

let graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "A");
console.log(graph);
graph.removeEdge("A", "B");
console.log(graph);
graph.removeVertex("C");
console.log(graph);
