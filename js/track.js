const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_ROWS = 15;
const TRACK_COLUMNS = 20;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_GOAL = 2;
const TRACK_TREE = 3;
const TRACK_FLAG = 4;
const TRACK_PLAYERSTART = 8;

let levelOneTrack = [
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

let trackGrid = [];

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

function handleTrackCollision(warrior) {
  if (trackTypeAt(warrior.x, warrior.y) === TRACK_ROAD) {
    return;
  }

  if (trackTypeAt(warrior.x, warrior.y) === TRACK_GOAL) {
    loadLevel(levelOneTrack);
    return;
  }

  warrior.speed *= -0.5;
  // avoid getting stuck in this condition
  warrior.x += Math.cos(warrior.ang) * warrior.speed;
  warrior.y += Math.sin(warrior.ang) * warrior.speed;

  // look ahead to see if warrior needs to bounce back fully
  if (trackTypeAt(warrior.x, warrior.y) !== TRACK_ROAD) {
    warrior.speed *= 2;

    warrior.x += Math.cos(warrior.ang) * warrior.speed;
    warrior.y += Math.sin(warrior.ang) * warrior.speed;
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

function trackTypeAt(x, y) {
  let trackIndex = trackIndexAt(x, y);
  let trackType = TRACK_WALL;

  if (trackIndex >= 0 && trackIndex < trackGrid.length) {
    trackType = trackGrid[trackIndex];
  }

  return trackType;
}
