const MOVE_STEP = 5;

class Head {
  constructor(opts = {}) {
    this.eatCount = opts.eatCount || 0;
    this.x = opts.x;
    this.y = opts.y;
    this.height = opts.height;
    this.tails = opts.tails || [];
    this.direction = opts.direction;
    this.command = opts.command;
    this.dead = opts.dead || false;
  }
  move() {
    if (this.dead || !this.command) {
      return;
    }

    if (!this.direction) {
      this.direction = this.command.direction;
      // send a command for tails for their next move
      const followCommand = {
        direction: this.direction,
        x: this.x,
        y: this.y,
      };
      this.tails.forEach((tail) => tail.commands.push(followCommand));
    }
    // when head arrives at a postion of the command, update the direction
    // and inform the tails about their next move
    else if (this.command.x === this.x && this.command.y === this.y) {
      this.direction = this.command.direction;
      this.tails.forEach((tail) => tail.commands.push(this.command));
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
  reset(opts) {
    this.x = opts.x;
    this.y = opts.y;
    this.height = opts.height;

    const initTail = (function () {
      const lastBody = this.tails[this.tails.length - 1] || this;
      const tail = new Tail({x: lastBody.x - this.height, y: lastBody.y, height: this.height});
      this.tails.push(tail);
    }).bind(this);
    initTail();
    initTail();
  }
  addTail() {
    const lastTail = this.tails[this.tails.length - 1];
    let tailOpts = {direction: lastTail.direction, height: this.height};
    // set next tail point and direction and commands from last tail
    switch (lastTail.direction) {
      case moveKeyCodes.LEFT:
        tailOpts = {x: lastTail.x + this.height, y: lastTail.y, ...tailOpts};
        break;
      case moveKeyCodes.RIGHT:
        tailOpts = {x: lastTail.x - this.height, y: lastTail.y, ...tailOpts};
        break;
      case moveKeyCodes.UP:
        tailOpts = {x: lastTail.x, y: lastTail.y + this.height, ...tailOpts};
        break;
      case moveKeyCodes.DOWN:
        tailOpts = {x: lastTail.x, y: lastTail.y - this.height, ...tailOpts};
        break;
    }
    const tail = new Tail(tailOpts);
    lastTail.commands.forEach((command) => tail.commands.push(command));
    this.tails.push(tail);
  }
  // when moving right or down, the head.x and head.y are 'behind' by one tile, so use collidablePoint to adjust the point for a collision (-1 to avoid entering the collision point too early by crossing into the next tile)
  collidablePoint() {
    const collidablePoint = {x: this.x, y: this.y};
    switch (this.direction) {
      case moveKeyCodes.RIGHT:
        collidablePoint.x = this.x + this.height - 1;
        break;
      case moveKeyCodes.DOWN:
        collidablePoint.y = this.y + this.height - 1;
        break;
    }
    return collidablePoint;
  }
  die() {
    this.dead = true;
    this.tails.forEach((tail) => tail.die());
    console.error('DEAD');
  }
}
