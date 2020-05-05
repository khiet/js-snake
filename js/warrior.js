const SPEED_DECAY_MULTIPLIER = 0.97;
const ACCELERATION_POWER = 0.4;
const REVERSE_POWER = 0.4;
const TURN_RATE = 0.08;
const MIN_SPEED_TO_TURN = 0.5;

let canvas;
let canvasContext;

function Warrior() {
  this.name = 'Unnamed Warrior';

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

Warrior.prototype.setupInput = function (upKey, downKey, leftKey, rightKey) {
  this.controlAccelerate = upKey;
  this.controlReverse = downKey;
  this.controlTurnLeft = leftKey;
  this.controlTurnRight = rightKey;
};

Warrior.prototype.moveWarrior = function () {
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

Warrior.prototype.resetWarrior = function (name) {
  this.name = name;
  this.speed = 0;
  for (let i = 0; i < WORLD_ROWS; i++) {
    for (let j = 0; j < WORLD_COLUMNS; j++) {
      let worldIndex = worldIndexAtRowColumn(i, j);
      if (worldGrid[worldIndex] == WORLD_PLAYERSTART) {
        // reset world to contain only 1 or 0
        worldGrid[worldIndex] = WORLD_ROAD;

        this.ang = -Math.PI / 2;
        this.x = j * WORLD_H + WORLD_H / 2;
        this.y = i * WORLD_W + WORLD_W / 2;
        return;
      }
    }
  }
}

Warrior.prototype.drawWarrior = function (pic) {
  drawBitmapCenteredWithRotation(pic, this.x, this.y, this.ang);
}
