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
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 1, 1, 1, 1,
  1, 0, 3, 0, 3, 0, 1, 0, 8, 0, 1, 0, 1, 3, 3, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 4, 1, 4, 1, 1,
  1, 1, 1, 4, 1, 1, 1, 0, 3, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 1, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 4, 0, 4, 0, 4, 0, 2, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
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

      if (isTransparencyFile(worldType)) {
        drawBitmap(worldPics[TILE_ROAD], worldTileX, worldTileY);
      }

      drawBitmap(worldImage, worldTileX, worldTileY);
      worldIndex++;
      worldTileX += TILE_W;
    }
    worldTileX = 0;
    worldTileY += TILE_H;
  }
}

function isTransparencyFile(tileType) {
  return [TILE_GOAL, TILE_KEY, TILE_DOOR].includes(tileType);
}

function handleWorldCollision(warrior) {
  if (worldTypeAt(warrior.x, warrior.y) === TILE_ROAD) {
    return;
  }

  if (worldTypeAt(warrior.x, warrior.y) === TILE_GOAL) {
    loadLevel(levelOneWorld);
    return;
  }

  if (worldTypeAt(warrior.x, warrior.y) === TILE_KEY) {
    getKey(warrior);
  }

  if (worldTypeAt(warrior.x, warrior.y) === TILE_DOOR) {
    openDoor(warrior);
  }

  warrior.rollbackWarrior();
}

function getKey(warrior) {
  const worldIndex = worldIndexAt(warrior.x, warrior.y);
  worldGrid[worldIndex] = TILE_ROAD;
  warrior.keyCount++;
}

function openDoor(warrior) {
  if (warrior.keyCount < 1) {
    return;
  }

  const worldIndex = worldIndexAt(warrior.x, warrior.y);
  worldGrid[worldIndex] = TILE_ROAD;
  warrior.keyCount--;
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
