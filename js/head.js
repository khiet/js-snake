const MOVE_STEP = 5;

function Head() {
  this.eatCount = 0;

  this.x;
  this.y;

  this.tails = [];

  this.direction;
  this.command;

  this.dead = false;
}

Head.prototype.move = function () {
  if (this.dead) {
    return;
  }

  if (!this.command) {
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
    head.tails.forEach((tail) => tail.commands.push(followCommand));
  } else if (this.command.x === this.x && this.command.y === this.y) {
    this.direction = this.command.direction;
    head.tails.forEach((tail) => tail.commands.push(this.command));
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

Head.prototype.reset = function (x, y) {
  this.x = x;
  this.y = y;
  colorRect(this.x, this.y, TILE_W, TILE_H, 'cadetblue');

  this.initTail();
  this.initTail();
}

Head.prototype.addTail = function () {
  const lastTail = this.tails[this.tails.length - 1];

  let tail;
  // set next tail point and direction and commands from last tail
  switch (lastTail.direction) {
    case moveKeyCodes.LEFT:
      tail = new Tail(lastTail.x + TILE_W, lastTail.y);
      break;
    case moveKeyCodes.RIGHT:
      tail = new Tail(lastTail.x - TILE_W, lastTail.y);
      break;
    case moveKeyCodes.UP:
      tail = new Tail(lastTail.x, lastTail.y + TILE_H);
      break;
    case moveKeyCodes.DOWN:
      tail = new Tail(lastTail.x, lastTail.y - TILE_H);
      break;
  }
  tail.direction = lastTail.direction;
  lastTail.commands.forEach((command) => tail.commands.push(command));

  this.tails.push(tail);
}

Head.prototype.initTail = function () {
  const lastBody = this.tails[this.tails.length - 1] || this;

  tail = new Tail(lastBody.x - TILE_W, lastBody.y);
  this.tails.push(tail);
}

Head.prototype.draw = function () {
  colorRect(this.x, this.y, TILE_W, TILE_H, 'cadetblue');
}

// when moving right or down, the head.x and head.y are 'behind' by one tile, so use collidablePoint to adjust the point for a collision
Head.prototype.collidablePoint = function () {
  let collidablePoint = {x: this.x, y: this.y};

  switch (head.direction) {
    case moveKeyCodes.RIGHT:
      collidablePoint.x = head.x + TILE_W - MOVE_STEP;
      break;
    case moveKeyCodes.DOWN:
      collidablePoint.y = head.y + TILE_H - MOVE_STEP;
      break;
  }

  return collidablePoint;
}

Head.prototype.die = function () {
  this.dead = true;
  this.tails.forEach((tail) => tail.die());
  console.error('DEAD');
}
