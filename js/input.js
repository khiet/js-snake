// dependencies world, head

const moveKeyCodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

const oppositeDirections = {
  [moveKeyCodes.LEFT]: moveKeyCodes.RIGHT,
  [moveKeyCodes.UP]: moveKeyCodes.DOWN,
  [moveKeyCodes.RIGHT]: moveKeyCodes.LEFT,
  [moveKeyCodes.DOWN]: moveKeyCodes.UP
}

function setupInput(world, head) {
  document.addEventListener(
    'keydown',
    function (e) {
      if (_validInput(e, head)) {
        _sendCommand(e, world, head);
      }
    }
  );
}

function _validInput(e, head) {
  return _allowedDirectionAtStart(e, head) &&
    _allowedKeyCode(e) &&
    _allowedDirection(e, head) &&
    _hasDirectionChanged(e, head);
}

function _sendCommand(e, world, head) {
  // sends a command to act on at a next tile
  const point = _nextMoveWorldPoint(world, head);
  const command = {
    direction: e.keyCode,
    x: point.x,
    y: point.y
  };
  head.command = command

  console.table(head.command);
}

function _allowedKeyCode(e) {
  return Object.values(moveKeyCodes).includes(e.keyCode);
}

function _allowedDirection(e, head) {
  return oppositeDirections[e.keyCode] !== head.direction;
}

function _allowedDirectionAtStart(e, head) {
  if (head.command) {
    return true;
  }

  return e.keyCode !== moveKeyCodes.LEFT;
}

function _hasDirectionChanged(e, head) {
  return e.keyCode !== head.direction;
}

function _nextMoveWorldPoint(world, head) {
  const nextMoveIndex = _nextMoveWorldIndex(world, head);
  return world.worldPointAtIndex(nextMoveIndex);
}

function _nextMoveWorldIndex(world, head) {
  let nextMoveWorldIndex;

  switch (head.direction) {
    case moveKeyCodes.LEFT:
      nextMoveWorldIndex = world.worldIndexAt(head.x, head.y);
      break;
    case moveKeyCodes.RIGHT:
      nextMoveWorldIndex = world.worldIndexAt(head.x + world.tile_w, head.y);
      break;
    case moveKeyCodes.UP:
      nextMoveWorldIndex = world.worldIndexAt(head.x, head.y);
      break;
    case moveKeyCodes.DOWN:
      nextMoveWorldIndex = world.worldIndexAt(head.x, head.y + world.tile_h);
      break;
  }

  return nextMoveWorldIndex;
}
