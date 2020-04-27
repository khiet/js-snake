const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_ROWS = 15;
const TRACK_COLUMNS = 20;
let trackGrid = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 2, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 8, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_GOAL = 2;
const TRACK_TREE = 3;
const TRACK_FLAG = 4;
const TRACK_PLAYERSTART = 8;

function drawTracks() {
  for (let i = 0; i < TRACK_ROWS; i++) {
    for (let j = 0; j < TRACK_COLUMNS; j++) {
      let trackIndex = trackIndexAtRowColumn(i, j);

      let trackImage;

      if (trackGrid[trackIndex] == TRACK_WALL) {
        trackImage = trackWallPic;
      } else if (trackGrid[trackIndex] == TRACK_ROAD) {
        trackImage = trackRoadPic;
      } else if (trackGrid[trackIndex] == TRACK_GOAL) {
        trackImage = trackGoalPic;
      } else if (trackGrid[trackIndex] == TRACK_TREE) {
        trackImage = trackTreePic;
      } else if (trackGrid[trackIndex] == TRACK_FLAG) {
        trackImage = trackFlagPic;
      }

      drawBitmap(trackImage, TRACK_W * j, TRACK_H * i);
    }
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

function handleTrackCollision() {
  if (isObstacleAt(carX, carY)) {
    carSpeed *= -0.25;

    // avoid getting stuck in this condition
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
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
