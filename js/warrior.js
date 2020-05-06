const MOVE_STEP = 5;

let canvas;
let canvasContext;

function Warrior() {
  this.name = 'Unnamed Warrior';

  this.x = 0;
  this.y = 0;

  this.forward = false;
  this.backward = false;
  this.left = false;
  this.right = false;

  this.controlUp;
  this.controlDown;
  this.controlLeft;
  this.controlRight;
}

Warrior.prototype.setupInput = function (upKey, downKey, leftKey, rightKey) {
  this.controlUp = upKey;
  this.controlDown = downKey;
  this.controlLeft = leftKey;
  this.controlRight = rightKey;
};

Warrior.prototype.moveWarrior = function () {
  if (this.forward) {
    this.y -= MOVE_STEP;
  }

  if (this.backward) {
    this.y += MOVE_STEP;
  }

  if (this.left) {
    this.x -= MOVE_STEP;
  }

  if (this.right) {
    this.x += MOVE_STEP;
  }
}

Warrior.prototype.resetWarrior = function (name) {
  this.name = name;
  for (let i = 0; i < WORLD_ROWS; i++) {
    for (let j = 0; j < WORLD_COLUMNS; j++) {
      let worldIndex = worldIndexAtRowColumn(i, j);
      if (worldGrid[worldIndex] == WORLD_PLAYERSTART) {
        // reset world to contain only 1 or 0
        worldGrid[worldIndex] = WORLD_ROAD;

        this.x = (j * WORLD_H) + (WORLD_H / 2);
        this.y = (i * WORLD_W) + (WORLD_W / 2);
        return;
      }
    }
  }
}

Warrior.prototype.drawWarrior = function (pic) {
  drawBitmapCentered(pic, this.x, this.y);
}
