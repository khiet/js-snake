function Tail(x, y) {
  this.x = x;
  this.y = y;

  this.direction;
  this.commands = [];

  this.dead = false;
}

Tail.prototype.move = function () {
  if (this.dead) {
    return;
  }

  if (!this.direction && !this.hasCommand()) {
    return;
  }

  if (!this.direction) {
    // tail always moves down until it executes a command
    this.direction = moveKeyCodes.RIGHT;
  } else if (this.hasCommand() && this.commands[0].x === this.x && this.commands[0].y === this.y) {
    this.direction = this.commands[0].direction;
    this.commands.shift();
  }

  switch (this.direction) {
    case moveKeyCodes.LEFT:
      this.x -= MOVE_STEP;
      break;
    case moveKeyCodes.RIGHT:
      this.x += MOVE_STEP;
      break;
    case moveKeyCodes.UP:
      this.y -= MOVE_STEP;
      break;
    case moveKeyCodes.DOWN:
      this.y += MOVE_STEP;
      break;
  }
}

Tail.prototype.draw = function () {
  colorRect(this.x, this.y, TILE_W, TILE_H, 'steelblue');
}

Tail.prototype.hasCommand = function () {
  return this.commands.length > 0;
}

Tail.prototype.die = function () {
  this.dead = true;
}
