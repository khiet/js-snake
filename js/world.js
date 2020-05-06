const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_ROWS = 15;
const WORLD_COLUMNS = 20;

const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_GOAL = 2;
const WORLD_TREE = 3;
const WORLD_FLAG = 4;
const WORLD_PLAYERSTART = 8;

let levelOneWorld = [
  3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
  3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 3, 3, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 4, 0, 0, 0, 4, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 8, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  0, 2, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 2, 0, 0, 0, 0, 1, 3, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 3,
];

let worldGrid = [];

function drawWorlds() {
  let worldIndex = 0;
  let worldTileX = 0;
  let worldTileY = 0;
  for (let i = 0; i < WORLD_ROWS; i++) {
    for (let j = 0; j < WORLD_COLUMNS; j++) {
      let worldType = worldGrid[worldIndex];
      let worldImage = worldPics[worldType];
      drawBitmap(worldImage, worldTileX, worldTileY);
      worldIndex++;
      worldTileX += WORLD_W;
    }
    worldTileX = 0;
    worldTileY += WORLD_H;
  }
}

function handleWorldCollision(warrior) {
  if (worldTypeAt(warrior.x, warrior.y) === WORLD_ROAD) {
    return;
  }

  if (worldTypeAt(warrior.x, warrior.y) === WORLD_GOAL) {
    loadLevel(levelOneWorld);
    return;
  }

  warrior.rollbackWarrior();
}

function worldIndexAt(x, y) {
  let worldRowColumn = worldRowColumnAt(x, y);
  return worldIndexAtRowColumn(worldRowColumn.row, worldRowColumn.column);
}

function worldIndexAtRowColumn(row, column) {
  return (row * WORLD_COLUMNS) + column;
}

function worldRowColumnAt(x, y) {
  return {
    row: Math.floor(y / WORLD_H),
    column: Math.floor(x / WORLD_W)
  }
}

function worldTypeAt(x, y) {
  let worldIndex = worldIndexAt(x, y);
  let worldType = WORLD_WALL;

  if (worldIndex >= 0 && worldIndex < worldGrid.length) {
    worldType = worldGrid[worldIndex];
  }

  return worldType;
}
