window.expect = chai.expect;

describe('Tail', function () {
  function createTail() {
    const tail = new Tail({x: 10, y: 10, height: 10});

    return tail;
  }

  describe('move', function () {
    let command;
    let tail;
    context("when command is given", function () {
      command = {
        direction: moveKeyCodes.DOWN,
        x: 20,
        y: 10
      };
      context("and there is no direction", function () {
        beforeEach(function () {
          tail = createTail();
          tail.commands.push(command);
        });

        it('should set a default direction', function () {
          expect(tail.direction).to.eql(undefined);
          tail.move();
          expect(tail.direction).to.eql(moveKeyCodes.RIGHT);
        });
      });

      context("and there is a direction", function () {
        context("and command is at a tail position", function () {
          command = {
            direction: moveKeyCodes.DOWN,
            x: 10,
            y: 10
          };
          beforeEach(function () {
            tail = createTail();
            tail.commands.push(command);
            tail.direction = moveKeyCodes.RIGHT;
          });

          it('should set a direction according to the command', function () {
            expect(tail.direction).to.eql(moveKeyCodes.RIGHT);
            tail.move();
            expect(tail.direction).to.eql(moveKeyCodes.DOWN);
          });

          it('should remove the command', function () {
            expect(tail.commands).to.eql([command]);
            tail.move();
            expect(tail.commands).to.eql([]);
          });
        });
      });

      context("and the direction is LEFT", function () {
        beforeEach(function () {
          tail = createTail();
          tail.direction = moveKeyCodes.RIGHT;
          tail.commands.push(command);
          command.direction = moveKeyCodes.LEFT;
        });

        it('should update x', function () {
          tail.move();
          expect(tail.x).to.eql(10 - MOVE_STEP);
        });
      });

      context("and the direction is RIGHT", function () {
        beforeEach(function () {
          tail = createTail();
          tail.direction = moveKeyCodes.RIGHT;
          tail.commands.push(command);
          command.direction = moveKeyCodes.RIGHT;
        });

        it('should update x', function () {
          tail.move();
          expect(tail.x).to.eql(10 + MOVE_STEP);
        });
      });

      context("and the direction is UP", function () {
        beforeEach(function () {
          tail = createTail();
          tail.direction = moveKeyCodes.RIGHT;
          tail.commands.push(command);
          command.direction = moveKeyCodes.UP;
        });

        it('should update y', function () {
          tail.move();
          expect(tail.y).to.eql(10 - MOVE_STEP);
        });
      });

      context("and the direction is DOWN", function () {
        beforeEach(function () {
          tail = createTail();
          tail.direction = moveKeyCodes.RIGHT;
          tail.commands.push(command);
          command.direction = moveKeyCodes.DOWN;
        });

        it('should update y', function () {
          tail.move();
          expect(tail.y).to.eql(10 + MOVE_STEP);
        });
      });
    });
  });

  describe('die', function () {
    it('should change dead to true', function () {
      const tail = createTail();

      expect(tail.dead).to.eql(false);
      tail.die();
      expect(tail.dead).to.eql(true);
    });
  });
});
