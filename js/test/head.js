window.expect = chai.expect;

describe('Head', function () {
  function createHead() {
    const head = new Head();
    head.reset({x: 20, y: 10, height: 10});

    return head;
  }

  describe('move', function () {
    context("when command is given", function () {
      const command = {
        direction: moveKeyCodes.DOWN,
        x: 20,
        y: 10
      };

      context("and there is no direction", function () {
        let head;
        beforeEach(function () {
          head = createHead();
          head.command = command;
        });

        it('should set direction', function () {
          expect(head.direction).to.eql(undefined);
          head.move();
          expect(head.direction).to.eql(moveKeyCodes.DOWN);
        });

        it('should send command to tails', function () {
          expect(head.tails[0].commands).to.eql([]);
          expect(head.tails[1].commands).to.eql([]);
          head.move();
          expect(head.tails[0].commands).to.eql([command]);
          expect(head.tails[1].commands).to.eql([command]);
        });
      });

      context("and there is a direction", function () {
        let head;
        beforeEach(function () {
          head = createHead();
          head.command = command;
          head.direction = moveKeyCodes.RIGHT
        });

        it('should set the direction from the command', function () {
          expect(head.direction).to.eql(moveKeyCodes.RIGHT);
          head.move();
          expect(head.direction).to.eql(moveKeyCodes.DOWN);
        });

        it('should send command to tails', function () {
          const tail1Commands = chai.spy.on(head.tails[0].commands, 'push');
          const tail2Commands = chai.spy.on(head.tails[1].commands, 'push');
          head.move();
          expect(tail1Commands).to.have.been.called();
          expect(tail2Commands).to.have.been.called();
        });

        context("and the direction is LEFT", function () {
          beforeEach(function () {
            command.direction = moveKeyCodes.LEFT;
          });

          it('should update x', function () {
            head.move();
            expect(head.x).to.eql(20 - MOVE_STEP);
          });
        });

        context("and the direction is RIGHT", function () {
          beforeEach(function () {
            command.direction = moveKeyCodes.RIGHT;
          });

          it('should update x', function () {
            head.move();
            expect(head.x).to.eql(20 + MOVE_STEP);
          });
        });

        context("and the direction is UP", function () {
          beforeEach(function () {
            command.direction = moveKeyCodes.UP;
          });

          it('should update y', function () {
            head.move();
            expect(head.y).to.eql(10 - MOVE_STEP);
          });
        });

        context("and the direction is DOWN", function () {
          beforeEach(function () {
            command.direction = moveKeyCodes.DOWN;
          });

          it('should update y', function () {
            head.move();
            expect(head.y).to.eql(10 + MOVE_STEP);
          });
        });
      });
    });
  });

  describe('reset', function () {
    it('should set x, y and height as given', function () {
      const head = createHead();

      expect(head.x).to.eql(20);
      expect(head.y).to.eql(10);
      expect(head.height).to.eql(10);
    });

    it('should add two tails', function () {
      const head = createHead();

      expect(head.tails.length).to.eql(2);
    });

    it('should have an expected first tail', function () {
      const head = createHead();

      expect(head.tails[0].x).to.eql(10);
      expect(head.tails[0].y).to.eql(10);
      expect(head.tails[0].height).to.eql(10);
    });

    it('should have an expected second tail', function () {
      const head = createHead();

      expect(head.tails[1].x).to.eql(0);
      expect(head.tails[1].y).to.eql(10);
      expect(head.tails[1].height).to.eql(10);
    });
  });

  describe('addTail', function () {
    it('should add a tail', function () {
      const head = createHead();

      expect(head.tails.length).to.eql(2);
      head.addTail();
      expect(head.tails.length).to.eql(3);
    });

    context("when last tail's direction is RIGHT", function () {
      const head = createHead();
      beforeEach(function () {
        head.tails[1].direction = moveKeyCodes.RIGHT;
      });

      it('should add a tail with expected x and y', function () {
        head.addTail();
        expect(head.tails[2].x).to.eql(-10);
        expect(head.tails[2].y).to.eql(10);
      });
    });

    context("when last tail's direction is LEFT", function () {
      const head = createHead();
      beforeEach(function () {
        head.tails[1].direction = moveKeyCodes.LEFT;
      });

      it('should add a tail with expected x and y', function () {
        head.addTail();
        expect(head.tails[2].x).to.eql(10);
        expect(head.tails[2].y).to.eql(10);
      });
    });

    context("when last tail's direction is UP", function () {
      const head = createHead();
      beforeEach(function () {
        head.tails[1].direction = moveKeyCodes.UP;
      });

      it('should add a tail with expected x and y', function () {
        head.addTail();
        expect(head.tails[2].x).to.eql(0);
        expect(head.tails[2].y).to.eql(20);
      });
    });

    context("when last tail's direction is DOWN", function () {
      const head = createHead();
      beforeEach(function () {
        head.tails[1].direction = moveKeyCodes.DOWN;
      });

      it('should add a tail with expected x and y', function () {
        head.addTail();
        expect(head.tails[2].x).to.eql(0);
        expect(head.tails[2].y).to.eql(0);
      });
    });
  });

  describe('collidablePoint', function () {
    it("should return head's x and y", function () {
      const head = createHead();

      expect(head.collidablePoint()).to.eql({x: head.x, y: head.y});
    });

    context('when direction is RIGHT', function () {
      const head = createHead();
      beforeEach(function () {
        head.direction = moveKeyCodes.RIGHT;
      });

      it("should offset x by it's height", function () {
        expect(head.collidablePoint()).to.eql({x: head.x + head.height - 1, y: head.y});
      });
    });

    context('when direction is DOWN', function () {
      const head = createHead();
      beforeEach(function () {
        head.direction = moveKeyCodes.DOWN;
      });

      it("should offset y by it's height", function () {
        expect(head.collidablePoint()).to.eql({x: head.x, y: head.y + head.height - 1});
      });
    });
  });

  describe('die', function () {
    it('should change dead to true', function () {
      const head = createHead();

      expect(head.dead).to.eql(false);
      head.die();
      expect(head.dead).to.eql(true);
    });

    it('should send die to tails', function () {
      const head = createHead();

      const tail1 = chai.spy.on(head.tails[0], 'die');
      const tail2 = chai.spy.on(head.tails[1], 'die');
      head.die();
      expect(tail1).to.have.been.called();
      expect(tail2).to.have.been.called();
    });
  });
});
