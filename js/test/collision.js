window.expect = chai.expect;

describe('Collision', function () {
  describe('handleCollision', function () {
    const worldGrid = [
      2, 2, 2, 2, 2,
      2, 0, 0, 0, 2,
      2, 0, 0, 0, 2,
      2, 0, 0, 0, 2,
      2, 2, 2, 2, 2,
    ];
    const world = new World({grid: worldGrid, w: 10, h: 10, rows: 5, columns: 5});
    const foodIndex = 7;

    context('when head is at food index', function () {
      let head;
      beforeEach(function () {
        head = new Head();
        head.reset({x: 20, y: 10, height: 10});
      });

      it('should return a new index other than current index', function () {
        expect(Collision.handleCollision(world, head, foodIndex)).to.not.equal(foodIndex);
      });

      it("should increment heat's eatCount", function () {
        Collision.handleCollision(world, head, foodIndex)
        expect(head.eatCount).to.equal(1);
      });

      it("should add a new tail", function () {
        expect(head.tails.length).to.equal(2);
        Collision.handleCollision(world, head, foodIndex)
        expect(head.tails.length).to.equal(3);
      });
    });

    context('when head is at wall index', function () {
      let head;
      beforeEach(function () {
        head = new Head();
        head.reset({x: 0, y: 0, height: 10});
      });

      it("should cause head to die", function () {
        Collision.handleCollision(world, head, foodIndex)
        expect(head.dead).to.equal(true);
      });
    });

    context('when head is at tail index', function () {
      let head;
      beforeEach(function () {
        head = new Head();
        head.reset({x: 30, y: 20, height: 10});
      });

      it("should cause head to die", function () {
        // make head position overlap with the last tail
        head.x = 10;
        Collision.handleCollision(world, head, foodIndex)
        expect(head.dead).to.equal(true);
      });
    });

    context('when head is dead', function () {
      const head = new Head({x: 0, y: 0, height: 10, dead: true});

      it('should return current index', function () {
        expect(Collision.handleCollision(world, head, foodIndex)).to.equal(foodIndex);
      });
    });
  });
});
