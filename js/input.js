const keyCodes = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
}

let keyHoldAccelerate = false;
let keyHoldReverse = false;
let keyHoldTurnLeft = false;
let keyHoldTurnRight = false;

function keyPressed(e) {
  switch (e.keyCode) {
    case keyCodes.ARROW_LEFT:
      keyHoldTurnLeft = true;
      break;
    case keyCodes.ARROW_RIGHT:
      keyHoldTurnRight = true;
      break;
    case keyCodes.ARROW_UP:
      keyHoldAccelerate = true;
      break;
    case keyCodes.ARROW_DOWN:
      keyHoldReverse = true;
      break;
  }
}

function keyReleased(e) {
  switch (e.keyCode) {
    case keyCodes.ARROW_LEFT:
      keyHoldTurnLeft = false;
      break;
    case keyCodes.ARROW_RIGHT:
      keyHoldTurnRight = false;
      break;
    case keyCodes.ARROW_UP:
      keyHoldAccelerate = false;
      break;
    case keyCodes.ARROW_DOWN:
      keyHoldReverse = false;
      break;
  }
}
