class Stem {
  constructor(col, row, canvasGrid) {
    this.frontierCol = col;
    this.frontierRow = row;
    this.isGrown = false;
    this.canvasGrid = canvasGrid;
  }

  grow(canvasGrid) {
    console.assert(!this.isGrown);
  }
}
