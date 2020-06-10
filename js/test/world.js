window.expect = chai.expect;

describe('World', function () {
  describe('worldIndexAt', function () {
    const world = new World({grid: [], w: 10, h: 10, rows: 10, columns: 10});

    it('should return expected index for a point', function () {
      expect(world.worldIndexAt(0, 0)).to.equal(0);
    });

    it('should return expected index for a point', function () {
      expect(world.worldIndexAt(31, 39)).to.equal(33);
    });

    it('should return expected index for a point', function () {
      expect(world.worldIndexAt(99, 91)).to.equal(99);
    });
  });

  describe('worldRowColumnAt', function () {
    const world = new World({grid: [], w: 10, h: 10, rows: 10, columns: 10});

    it('should return expected row and column for a point', function () {
      expect(world.worldRowColumnAt(0, 0)).to.eql(
        {row: 0, column: 0}
      );
    });

    it('should return expected row and column for a point', function () {
      expect(world.worldRowColumnAt(9, 10)).to.eql(
        {row: 1, column: 0}
      );
    });

    it('should return expected row and column for a point', function () {
      expect(world.worldRowColumnAt(10, 9)).to.eql(
        {row: 0, column: 1}
      );
    });

    it('should return expected row and column for a point', function () {
      expect(world.worldRowColumnAt(190, 190)).to.eql(
        {row: 19, column: 19}
      );
    });
  });

  describe('worldPointAtIndex', function () {
    const world = new World({grid: [], w: 10, h: 10, rows: 10, columns: 10});

    it('should return expected point for an index', function () {
      expect(world.worldPointAtIndex(0)).to.eql(
        {x: 0, y: 0}
      );
    });

    it('should return expected point for an index', function () {
      expect(world.worldPointAtIndex(33)).to.eql(
        {x: 30, y: 30}
      );
    });

    it('should return expected point for an index', function () {
      expect(world.worldPointAtIndex(99)).to.eql(
        {x: 90, y: 90}
      );
    });
  });

  describe('worldIndexAtRowColumn', function () {
    const world = new World({grid: [], w: 10, h: 10, rows: 10, columns: 10});

    it('should return expected index for a row and column', function () {
      expect(world.worldIndexAtRowColumn(0, 0)).to.equal(0);
    });

    it('should return expected index for a row and column', function () {
      expect(world.worldIndexAtRowColumn(9, 9)).to.equal(99);
    });
  });

  describe('worldTypeAtIndex', function () {
    const worldGrid = [
      0, 1, 0,
      1, 2, 3,
      1, 0, 1,
    ];
    const world = new World({grid: worldGrid, w: 10, h: 10, rows: 3, columns: 3});

    it('should return expected type for an index', function () {
      expect(world.worldTypeAtIndex(3)).to.equal(1);
    });

    it('should return expected type for an index', function () {
      expect(world.worldTypeAtIndex(4)).to.equal(2);
    });

    it('should return expected type for an index', function () {
      expect(world.worldTypeAtIndex(7)).to.equal(0);
    });
  });

  describe('worldTypeAt', function () {
    const worldGrid = [
      0, 1, 0,
      1, 2, 3,
      1, 0, 1,
    ];
    const world = new World({grid: worldGrid, w: 10, h: 10, rows: 3, columns: 3});

    it('should return expected type for a point', function () {
      expect(world.worldTypeAt(0, 10)).to.equal(1);
    });

    it('should return expected type for a point', function () {
      expect(world.worldTypeAt(10, 0)).to.equal(1);
    });

    it('should return expected type for a point', function () {
      expect(world.worldTypeAt(15, 15)).to.equal(2);
    });
  });
});
