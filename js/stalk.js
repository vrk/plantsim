class Stalk {
  constructor(col, row, canvasGrid) {
    this.frontierCol = col;
    this.frontierRow = row;
    this.isGrown = false;
    this.canvasGrid = canvasGrid;
    this.leftStemCreated = false;
    this.rightStemCreated = false;
  }

  getLeftStem() {
    console.assert(this.isGrown);
    console.assert(!this.leftStemCreated);
    this.leftStemCreated = true;
    return new Stem(this.frontierCol - 1, this.frontierRow);
  }

  getRightStem() {
    console.assert(this.isGrown);
    console.assert(!this.rightStemCreated);
    this.rightStemCreated = true;
    return new Stem(this.frontierCol + 1, this.frontierRow);
  }

  grow(canvasGrid) {
    console.assert(!this.isGrown);

    this.frontierRow--;
    if (this.frontierRow >= GROUND_LEVEL) {
      // Grow straight upward until ground is broken.
      this.canvasGrid.update(this.frontierCol, this.frontierRow, DARK_GREEN);
    } else if (this.frontierRow === GROUND_LEVEL - 1) {
      for (let delta = -1; delta <= 1; delta++) {
        this.canvasGrid.update(this.frontierCol + delta, this.frontierRow, DARK_GREEN);
      }
    } else if (this.frontierRow > SPROUT_POINT) {
      this.canvasGrid.update(this.frontierCol, this.frontierRow, DARK_GREEN);
    } else {
      console.assert(this.frontierRow === SPROUT_POINT);
      this.canvasGrid.update(this.frontierCol - 1, this.frontierRow, DARK_GREEN);
      this.canvasGrid.update(this.frontierCol + 1, this.frontierRow, DARK_GREEN);
      this.isGrown = true;
    }
  }
}
