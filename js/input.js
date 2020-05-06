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
    case warrior.controlLeft:
      warrior.left = bool;
      break;
    case warrior.controlRight:
      warrior.right = bool;
      break;
    case warrior.controlUp:
      warrior.forward = bool;
      break;
    case warrior.controlDown:
      warrior.backward = bool;
      break;
  }
}
