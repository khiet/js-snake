const keyCodes = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
}

function setupInput() {
  car1.setupInput(keyCodes.ARROW_UP, keyCodes.ARROW_DOWN, keyCodes.ARROW_LEFT, keyCodes.ARROW_RIGHT);

  document.addEventListener(
    'keydown',
    function (e) {
      applyControl(e, car1, true);
    });

  document.addEventListener(
    'keyup',
    function (e) {
      applyControl(e, car1, false);
    });
}

function applyControl(e, car, bool) {
  switch (e.keyCode) {
    case car.controlTurnLeft:
      car.turnLeft = bool;
      break;
    case car.controlTurnRight:
      car.turnRight = bool;
      break;
    case car.controlAccelerate:
      car.accelerate = bool;
      break;
    case car.controlReverse:
      car.reverse = bool;
      break;
  }
}
