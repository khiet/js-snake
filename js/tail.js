class Tail {
  constructor(opts = {}) {
    this.x = opts.x;
    this.y = opts.y;
    this.height = opts.height;
    this.direction = opts.direction;
    this.commands = opts.commands || [];
    this.dead = opts.dead || false;
  }
  move() {
    if (this.dead) {
      return;
    }
    if (!this.direction && !this._hasCommand()) {
      return;
    }
    if (!this.direction) {
      // set tail's default direction until it executes a command
      this.direction = moveKeyCodes.RIGHT;
    }
    else if (this._hasCommand() && this.commands[0].x === this.x && this.commands[0].y === this.y) {
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
  die() {
    this.dead = true;
  }
  _hasCommand() {
    return this.commands.length > 0;
  }
}
