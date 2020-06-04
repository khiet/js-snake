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

function setupInput() {
  document.addEventListener(
    'keydown',
    function (e) {
      if (validInput(e, head)) {
        sendCommand(e, head);
      }
    }
  );
}

function validInput(e, head) {
  return allowedDirectionAtStart(e, head) &&
    allowedKeyCode(e) &&
    allowedDirection(e, head) &&
    hasDirectionChanged(e, head);
}

function allowedKeyCode(e) {
  return Object.values(moveKeyCodes).includes(e.keyCode);
}

function allowedDirection(e, head) {
  return oppositeDirections[e.keyCode] !== head.direction;
}

function allowedDirectionAtStart(e, head) {
  if (head.command) {
    return true;
  }

  return e.keyCode !== moveKeyCodes.LEFT;
}

function hasDirectionChanged(e, head) {
  return e.keyCode !== head.direction;
}

function sendCommand(e, head) {
  // sends a command to act on at a next tile
  const nextMoveIndex = nextMoveWorldIndex(head);
  const nextMovePoint = worldPointAtIndex(nextMoveIndex);
  const command = {
    direction: e.keyCode,
    x: nextMovePoint.x,
    y: nextMovePoint.y
  };
  head.command = command

  console.table(head.command);
}

function nextMoveWorldIndex(head) {
  let nextMoveWorldIndex;

  switch (head.direction) {
    case moveKeyCodes.LEFT:
      nextMoveWorldIndex = worldIndexAt(head.x, head.y);
      break;
    case moveKeyCodes.RIGHT:
      nextMoveWorldIndex = worldIndexAt(head.x + TILE_W, head.y);
      break;
    case moveKeyCodes.UP:
      nextMoveWorldIndex = worldIndexAt(head.x, head.y);
      break;
    case moveKeyCodes.DOWN:
      nextMoveWorldIndex = worldIndexAt(head.x, head.y + TILE_H);
      break;
  }

  return nextMoveWorldIndex;
}
