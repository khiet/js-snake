const moveKeyCodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

function setupInput() {
  document.addEventListener(
    'keydown',
    function (e) {
      if (hasDirectionChanged(e, head)) {
        sendCommand(e, head);
      }
    }
  );
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
