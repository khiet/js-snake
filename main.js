let carPic = document.createElement('img');
let carPicLoaded = false;

const SPEED_DECAY_MULTIPLIER = 0.97;
const ACCELERATION_POWER = 0.3;
const REVERSE_POWER = 0.3;
const TURN_RATE = 0.08;

let canvas;
let canvasContext;
let carX = 0;
let carY = 0;
let carAng = 0;

let carSpeed = 0;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_ROWS = 15;
const TRACK_COLUMNS = 20;
let trackGrid = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;

const keyCodes = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
}

let keyHoldAccelerate = false;
let keyHoldReverse = false;
let keyHoldTurnLeft = false;
let keyHoldTurnRight = false;

function keyPressed(e) {
  switch (e.keyCode) {
    case keyCodes.ARROW_LEFT:
      keyHoldTurnLeft = true;
      break;
    case keyCodes.ARROW_RIGHT:
      keyHoldTurnRight = true;
      break;
    case keyCodes.ARROW_UP:
      keyHoldAccelerate = true;
      break;
    case keyCodes.ARROW_DOWN:
      keyHoldReverse = true;
      break;
  }
}

function keyReleased(e) {
  switch (e.keyCode) {
    case keyCodes.ARROW_LEFT:
      keyHoldTurnLeft = false;
      break;
    case keyCodes.ARROW_RIGHT:
      keyHoldTurnRight = false;
      break;
    case keyCodes.ARROW_UP:
      keyHoldAccelerate = false;
      break;
    case keyCodes.ARROW_DOWN:
      keyHoldReverse = false;
      break;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  let fps = 30;
  setInterval(callBoth, 1000 / fps);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  carPic.onload = function () {
    carPicLoaded = true;
  };
  carPic.src = "car.png";

  resetCar();
});

function drawTracks() {
  const trackMargin = 2;

  for (let i = 0; i < TRACK_ROWS; i++) {
    for (let j = 0; j < TRACK_COLUMNS; j++) {
      let trackIndex = trackIndexAtRowColumn(i, j);

      if (trackGrid[trackIndex] == TRACK_WALL) {
        colorRect(TRACK_W * j, TRACK_H * i, TRACK_W - trackMargin, TRACK_H - trackMargin, 'blue');
      }
    }
  }
}

function resetCar() {
  for (let i = 0; i < TRACK_ROWS; i++) {
    for (let j = 0; j < TRACK_COLUMNS; j++) {
      let trackIndex = trackIndexAtRowColumn(i, j);
      if (trackGrid[trackIndex] == TRACK_PLAYERSTART) {
        // reset track to contain only 1 or 0
        trackGrid[trackIndex] = TRACK_ROAD;

        carAng = -Math.PI / 2;
        carX = j * TRACK_H + TRACK_H / 2;
        carY = i * TRACK_W + TRACK_W / 2;
      }
    }
  }
}

function callBoth() {
  moveAll();
  drawAll();
}

function carMove() {
  carSpeed *= SPEED_DECAY_MULTIPLIER;

  if (keyHoldAccelerate) {
    carSpeed += ACCELERATION_POWER;
  }

  if (keyHoldReverse) {
    carSpeed -= REVERSE_POWER;
  }

  if (keyHoldTurnLeft) {
    carAng -= TURN_RATE;
  }

  if (keyHoldTurnRight) {
    carAng += TURN_RATE;
  }

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

function carTrackHandling() {
  let trackIndex = trackIndexAt(carX, carY);
  if (trackIndex >= 0 && trackIndex < trackGrid.length && carX > 0 && carX < canvas.width) {
    if (trackGrid[trackIndex] == 1) {
      carSpeed *= -0.25;

      // avoid getting stuck in this condition
      carX += Math.cos(carAng) * carSpeed;
      carY += Math.sin(carAng) * carSpeed;
    }
  }
}

function moveAll() {
  carMove();
  carTrackHandling();
}

function colorRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

function colorText(text, x, y, color, size = 16, textAlign = 'left') {
  canvasContext.textAlign = textAlign;
  canvasContext.font = `normal ${size}px Arial`;

  canvasContext.fillStyle = color;
  canvasContext.fillText(text, x, y);
}

function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  if (carPicLoaded) {
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
  }

  drawTracks();
}

function drawBitmapCenteredWithRotation(pic, x, y, angle) {
  canvasContext.save();
  canvasContext.translate(x, y);
  canvasContext.rotate(angle);
  canvasContext.drawImage(pic, -pic.width / 2, -pic.height / 2);
  canvasContext.restore();
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
