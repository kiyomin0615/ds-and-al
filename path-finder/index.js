let maze = [];
let found = [];
let visited = [];
let parents = [];
let playerPos;
let pathIndex = 0;
let shortestPath = [];

const MAZE_SIZE = 15;
const CELL_STATE = {
  BLOCKED: 0,
  EMPTY: 1,
  EXIT: 9,
};

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
  const array2D = array.map((item) => new Array(col).fill(null));
  return array2D;
}

const startButtonEl = document.getElementById("start-button");

document.addEventListener("DOMContentLoaded", () => {
  startButtonEl.addEventListener("click", startGame);
});

function startGame() {
  startButtonEl.textContent = "Restart Game";
  resetMaze();
  generateRandomMaze();
  createMazeDom();
  renderMaze();
  BFS();
  updateMaze();
}

function resetMaze() {
  maze = create2DArray(MAZE_SIZE, MAZE_SIZE);
  found = create2DArray(MAZE_SIZE, MAZE_SIZE);
  visited = create2DArray(MAZE_SIZE, MAZE_SIZE);
  parents = create2DArray(MAZE_SIZE, MAZE_SIZE);

  playerPos = new Pos(1, 1);
  path = []; // Pos[]
  pathIndex = 0;

  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      maze[y][x] = CELL_STATE.EMPTY;
      found[y][x] = false;
      visited[y][x] = false;
      parents[y][x] = new Pos(-1, -1);
    }
  }
}

function generateRandomMaze() {
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      if (x % 2 === 0 || y % 2 === 0) {
        maze[y][x] = CELL_STATE.BLOCKED;
      } else {
        maze[y][x] = CELL_STATE.EMPTY;
      }
    }
  }

  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      if (x % 2 === 0 || y % 2 === 0) {
        continue;
      }
      if (x === MAZE_SIZE - 2 && y === MAZE_SIZE - 2) {
        continue;
      }
      if (x === MAZE_SIZE - 2) {
        maze[y + 1][x] = CELL_STATE.EMPTY;
        continue;
      }
      if (y === MAZE_SIZE - 2) {
        maze[y][x + 1] = CELL_STATE.EMPTY;
        continue;
      }
      if (Math.random() < 0.5) {
        maze[y][x + 1] = CELL_STATE.EMPTY;
      } else {
        maze[y + 1][x] = CELL_STATE.EMPTY;
      }
    }
  }

  maze[MAZE_SIZE - 2][MAZE_SIZE - 2] = CELL_STATE.EXIT;
}

function createMazeDom() {
  const mazeContainerEl = document.getElementById("maze-container");
  mazeContainerEl.innerHTML = "";

  for (let y = 0; y < MAZE_SIZE; y++) {
    const mazeRowEl = document.createElement("div");
    mazeRowEl.className = "maze-row";

    for (let x = 0; x < MAZE_SIZE; x++) {
      const mazeCellEl = document.createElement("div");
      mazeCellEl.className = "maze-cell";
      mazeCellEl.id = `cell-${y}-${x}`;
      mazeRowEl.appendChild(mazeCellEl);
    }

    mazeContainerEl.appendChild(mazeRowEl);
  }
}

function renderMaze() {
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      let mazeCellEl = document.querySelector(`#cell-${y}-${x}`);

      if (maze[y][x] === CELL_STATE.BLOCKED) {
        mazeCellEl.style.backgroundColor = "rgb(0, 0, 0)";
      } else if (maze[y][x] === CELL_STATE.EXIT) {
        mazeCellEl.style.backgroundColor = "rgb(253, 253, 80)";
      } else {
        mazeCellEl.style.backgroundColor = "rgb(79, 108, 197)";
      }

      if (playerPos.y === y && playerPos.x === x) {
        mazeCellEl.style.backgroundColor = "rgb(102, 202, 102)";
      }
    }
  }
}

function BFS() {
  const initialPos = new Pos(1, 1);
  const q = new Queue();

  found[initialPos.y][initialPos.x] = true; // 1. find
  q.enqueue(initialPos); // 2. reserve

  parents[initialPos.y][initialPos.x] = initialPos;

  while (true) {
    if (q.length() <= 0) {
      break;
    }

    const nowPos = q.dequeue();
    visited[(nowPos.y, nowPos.x)] = true; // 3. visit

    for (let i = 0; i < 4; i++) {
      let nextPos = new Pos(nowPos.y + DeltaY[i], nowPos.x + DeltaX[i]);

      if (maze[nextPos.y][nextPos.x] === CELL_STATE.BLOCKED) {
        continue;
      }
      if (found[nextPos.y][nextPos.x] === true) {
        continue;
      }

      found[nextPos.y][nextPos.x] = true; // found
      q.enqueue(nextPos); // reserve

      parents[nextPos.y][nextPos.x] = nowPos;
    }
  }

  findShortestPath();
}

function findShortestPath() {
  const pathFromDestination = [];

  let y = MAZE_SIZE - 2;
  let x = MAZE_SIZE - 2;

  while (!(parents[y][x].y === y && parents[y][x].x === x)) {
    pathFromDestination.push(new Pos(y, x));

    let parentPos = parents[y][x];
    y = parentPos.y;
    x = parentPos.x;
  }
  pathFromDestination.push(new Pos(1, 1));

  shortestPath = pathFromDestination.reverse();
}

function updateMaze() {
  if (pathIndex < shortestPath.length) {
    playerPos = shortestPath[pathIndex++];
    renderMaze();
    setTimeout(updateMaze, 200);
  }
}
