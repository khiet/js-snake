const TILE_W = 50;
const TILE_H = 50;
const TILE_ROWS = 12;
const TILE_COLUMNS = 16;

const TILE_ROAD = 0;
const TILE_WALL = 1;
const TILE_GOAL = 2;
const TILE_KEY = 3;
const TILE_DOOR = 4;
const TILE_PLAYERSTART = 8;

let levelOneWorld = [
  3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 3, 3, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 1,
  1, 0, 0, 1, 0, 0, 4, 0, 0, 0, 4, 0, 0, 1, 0, 1,
  1, 8, 0, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

let worldGrid = [];

function drawWorlds() {
  let worldIndex = 0;
  let worldTileX = 0;
  let worldTileY = 0;
  for (let i = 0; i < TILE_ROWS; i++) {
    for (let j = 0; j < TILE_COLUMNS; j++) {
      let worldType = worldGrid[worldIndex];
      let worldImage = worldPics[worldType];
      drawBitmap(worldImage, worldTileX, worldTileY);
      worldIndex++;
      worldTileX += TILE_W;
    }
    worldTileX = 0;
    worldTileY += TILE_H;
  }
}

function handleWorldCollision(warrior) {
  if (worldTypeAt(warrior.x, warrior.y) === TILE_ROAD) {
    return;
  }

  if (worldTypeAt(warrior.x, warrior.y) === TILE_GOAL) {
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
  return (row * TILE_COLUMNS) + column;
}

function worldRowColumnAt(x, y) {
  return {
    row: Math.floor(y / TILE_H),
    column: Math.floor(x / TILE_W)
  }
}

function worldTypeAt(x, y) {
  let worldIndex = worldIndexAt(x, y);
  let worldType = TILE_WALL;

  if (worldIndex >= 0 && worldIndex < worldGrid.length) {
    worldType = worldGrid[worldIndex];
  }

  return worldType;
}
