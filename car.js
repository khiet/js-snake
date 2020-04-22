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

function moveCar() {
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

function loadCarImage() {
  carPic.onload = function () {
    carPicLoaded = true;
  };
  carPic.src = "car.png";
}

function drawCar() {
  if (carPicLoaded) {
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
  }
}
