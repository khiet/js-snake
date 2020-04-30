const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_ROWS = 15;
const TRACK_COLUMNS = 20;
let trackGrid = [
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
  1, 8, 8, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  0, 2, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 2, 0, 0, 0, 0, 1, 3, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 3,
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_GOAL = 2;
const TRACK_TREE = 3;
const TRACK_FLAG = 4;
const TRACK_PLAYERSTART = 8;

function drawTracks() {
  let trackIndex = 0;
  let trackTileX = 0;
  let trackTileY = 0;
  for (let i = 0; i < TRACK_ROWS; i++) {
    for (let j = 0; j < TRACK_COLUMNS; j++) {
      let trackType = trackGrid[trackIndex];
      let trackImage = trackPics[trackType];
      drawBitmap(trackImage, trackTileX, trackTileY);
      trackIndex++;
      trackTileX += TRACK_W;
    }
    trackTileX = 0;
    trackTileY += TRACK_H;
  }
}

function isObstacleAt(x, y) {
  let trackIndex = trackIndexAt(x, y);
  let isObstacle = false;
  if (trackIndex >= 0 && trackIndex < trackGrid.length) {
    if (trackGrid[trackIndex] != TRACK_ROAD) {
      isObstacle = true;
    }
  }

  return isObstacle;
}

function handleTrackCollision(car) {
  if (isObstacleAt(car.x, car.y)) {
    car.speed *= -0.25;

    // avoid getting stuck in this condition
    car.x += Math.cos(car.ang) * car.speed;
    car.y += Math.sin(car.ang) * car.speed;
  }
}

function trackIndexAt(x, y) {
  let trackRowColumn = trackRowColumnAt(x, y);
  return trackIndexAtRowColumn(trackRowColumn.row, trackRowColumn.column);
}

function trackIndexAtRowColumn(row, column) {
  return (row * TRACK_COLUMNS) + column;
}

function trackRowColumnAt(x, y) {
  return {
    row: Math.floor(y / TRACK_H),
    column: Math.floor(x / TRACK_W)
  }
}
