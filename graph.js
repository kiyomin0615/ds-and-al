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
}

let graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addEdge("A", "B");
console.log(graph);
