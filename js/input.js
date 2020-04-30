const keyCodes = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  KEY_A: 65,
  KEY_W: 87,
  KEY_D: 68,
  KEY_S: 83,
}

function setupInput() {
  car1.setupInput(keyCodes.ARROW_UP, keyCodes.ARROW_DOWN, keyCodes.ARROW_LEFT, keyCodes.ARROW_RIGHT);
  car2.setupInput(keyCodes.KEY_W, keyCodes.KEY_S, keyCodes.KEY_A, keyCodes.KEY_D);

  document.addEventListener(
    'keydown',
    function (e) {
      applyControl(e, car1, true);
      applyControl(e, car2, true);
    });

  document.addEventListener(
    'keyup',
    function (e) {
      applyControl(e, car1, false);
      applyControl(e, car2, false);
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
