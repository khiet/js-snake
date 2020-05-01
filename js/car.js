const SPEED_DECAY_MULTIPLIER = 0.97;
const ACCELERATION_POWER = 0.3;
const REVERSE_POWER = 0.3;
const TURN_RATE = 0.08;
const MIN_SPEED_TO_TURN = 0.5;

let canvas;
let canvasContext;

function Car() {
  this.name = 'Unnamed Car';

  this.x = 0;
  this.y = 0;
  this.ang = 0;
  this.speed = 0;

  this.accelerate = false;
  this.reverse = false;
  this.turnLeft = false;
  this.turnRight = false;

  this.controlAccelerate;
  this.controlReverse;
  this.controlTurnLeft;
  this.controlTurnRight;
}

Car.prototype.setupInput = function (upKey, downKey, leftKey, rightKey) {
  this.controlAccelerate = upKey;
  this.controlReverse = downKey;
  this.controlTurnLeft = leftKey;
  this.controlTurnRight = rightKey;
};

Car.prototype.moveCar = function () {
  this.speed *= SPEED_DECAY_MULTIPLIER;

  if (this.accelerate) {
    this.speed += ACCELERATION_POWER;
  }

  if (this.reverse) {
    this.speed -= REVERSE_POWER;
  }

  if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
    if (this.turnLeft) {
      this.ang -= TURN_RATE;
    }

    if (this.turnRight) {
      this.ang += TURN_RATE;
    }
  }

  this.x += Math.cos(this.ang) * this.speed;
  this.y += Math.sin(this.ang) * this.speed;
}

Car.prototype.resetCar = function (name) {
  this.name = name;
  for (let i = 0; i < TRACK_ROWS; i++) {
    for (let j = 0; j < TRACK_COLUMNS; j++) {
      let trackIndex = trackIndexAtRowColumn(i, j);
      if (trackGrid[trackIndex] == TRACK_PLAYERSTART) {
        // reset track to contain only 1 or 0
        trackGrid[trackIndex] = TRACK_ROAD;

        this.ang = -Math.PI / 2;
        this.x = j * TRACK_H + TRACK_H / 2;
        this.y = i * TRACK_W + TRACK_W / 2;
        return;
      }
    }
  }
}

Car.prototype.drawCar = function (pic) {
  drawBitmapCenteredWithRotation(pic, this.x, this.y, this.ang);
}
