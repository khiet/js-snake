const TILE_W = 30;
const TILE_H = 30;
const TILE_ROWS = 20;
const TILE_COLUMNS = 20;

const TILE_WHITE = 0;
const TILE_BLACK = 1;

let baseWorld = [
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
];

let worldGrid;

function drawBaseWorld() {
  let worldIndex = 0;
  let worldTileX = 0;
  let worldTileY = 0;
  for (let i = 0; i < TILE_ROWS; i++) {
    for (let j = 0; j < TILE_COLUMNS; j++) {
      let worldType = worldGrid[worldIndex];
      if (worldType == TILE_WHITE) {
        colorRect(worldTileX, worldTileY, TILE_W, TILE_H, 'whitesmoke');
      } else if (worldType == TILE_BLACK) {
        colorRect(worldTileX, worldTileY, TILE_W, TILE_H, 'lightgrey');
      }
      worldIndex++;
      worldTileX += TILE_W;
    }
    worldTileX = 0;
    worldTileY += TILE_H;
  }
}

function drawFood(worldIndex) {
  const foodPoint = worldPointAtIndex(worldIndex);
  colorRect(foodPoint.x, foodPoint.y, TILE_W, TILE_H, 'darksalmon');
}

function handleWorldCollision(head, collisionIndex) {
  if (worldIndexAt(head.x, head.y) === collisionIndex) {
    head.eatCount++;
    head.addTail();
    return nextFoodIndex(collisionIndex);
  }

  return collisionIndex;
}

function nextFoodIndex(currentIndex) {
  let foodIndex = Math.floor(Math.random() * TILE_ROWS * TILE_COLUMNS);
  while (foodIndex === currentIndex) {
    foodIndex = Math.floor(Math.random() * TILE_ROWS * TILE_COLUMNS);
  }
  return foodIndex;
}

function worldIndexAt(x, y) {
  let worldRowColumn = worldRowColumnAt(x, y);
  return worldIndexAtRowColumn(worldRowColumn.row, worldRowColumn.column);
}

function worldPointAtIndex(index) {
  return {
    x: TILE_W * (index % (TILE_COLUMNS)),
    y: TILE_H * Math.floor((index / TILE_ROWS))
  };
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
  let worldType;

  if (worldIndex >= 0 && worldIndex < worldGrid.length) {
    worldType = worldGrid[worldIndex];
  }

  return worldType;
}
