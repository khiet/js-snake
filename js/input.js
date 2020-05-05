const keyCodes = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
}

function setupInput() {
  warrior1.setupInput(keyCodes.ARROW_UP, keyCodes.ARROW_DOWN, keyCodes.ARROW_LEFT, keyCodes.ARROW_RIGHT);

  document.addEventListener(
    'keydown',
    function (e) {
      applyControl(e, warrior1, true);
    });

  document.addEventListener(
    'keyup',
    function (e) {
      applyControl(e, warrior1, false);
    });
}

function applyControl(e, warrior, bool) {
  switch (e.keyCode) {
    case warrior.controlTurnLeft:
      warrior.turnLeft = bool;
      break;
    case warrior.controlTurnRight:
      warrior.turnRight = bool;
      break;
    case warrior.controlAccelerate:
      warrior.accelerate = bool;
      break;
    case warrior.controlReverse:
      warrior.reverse = bool;
      break;
  }
}
