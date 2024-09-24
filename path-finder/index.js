let maze = [];
let found = [];
let visited = [];
let parents = [];
let playerPos;

const MAZE_SIZE = 15;
const CELL_STATE = {
  BLOCKED: 0,
  EMPTY: 1,
  EXIT: 9
}

class Pos {
  constructor(y, x) {
    this.y = y;
    this.x = x;
  }
}

const DeltaY = [-1, 0, +1, 0];
const DeltaX = [0, +1, 0, -1];

class Queue {
  constructor() {
    this.arr = [];
  }
  enqueue(item) {
    this.arr.push(item);
  }
  dequeue() {
    return this.arr.shift();
  }
  length() {
    return this.arr.length;
  }
}

function create2DArray(row, col) {
  const array = new Array(row).fill(null);
  const array2D = array.map(item => new Array(col).fill(null));
  return array2D;
}

document.addEventListener("DOMContentLoaded", () => {
  const startButtonEl = document.getElementById("start-button");
  startButtonEl.addEventListener("click", startGame);
});

function startGame() {
  resetMaze();
}

function resetMaze() {
  maze = create2DArray(MAZE_SIZE, MAZE_SIZE); // Pos[15, 15]
  found = create2DArray(MAZE_SIZE, MAZE_SIZE); // bool[15, 15]
  visited = create2DArray(MAZE_SIZE, MAZE_SIZE); // bool[15, 15]
  parents = create2DArray(MAZE_SIZE, MAZE_SIZE); // Pos[15, 15]

  playerPos = new Pos(1, 1);
  path = []; // Pos[]
  pathIndex = 0;

  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      maze[y][x] = 0;
      found[y][x] = false;
      visited[y][x] = false;
      parents[y][x] = new Pos(-1, -1);
    }
  }
}
