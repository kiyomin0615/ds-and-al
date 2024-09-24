let maze = [];
let found = [];
let visited = [];
let parents = [];
let playerPos;

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

document.addEventListener("DOMContentLoaded", () => {
  const startButtonEl = document.getElementById("start-button");
  startButtonEl.addEventListener("click", startGame);
});

function startGame() {
  resetMaze();
  generateRandomMaze();
  createMazeDom();
  renderMaze();
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
        mazeCellEl.style.backgroundColor = "red";
      } else if (maze[y][x] === CELL_STATE.EXIT) {
        mazeCellEl.style.backgroundColor = "yellow";
      } else {
        mazeCellEl.style.backgroundColor = "royalblue";
      }
    }
  }
}
