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
    return new Stem(this.frontierCol - 1, this.frontierRow, this.canvasGrid);
  }

  getRightStem() {
    console.assert(this.isGrown);
    console.assert(!this.rightStemCreated);
    this.rightStemCreated = true;
    return new Stem(this.frontierCol + 1, this.frontierRow, this.canvasGrid);
  }

  grow(canvasGrid) {
    console.assert(!this.isGrown);

    const plantPixelSize = this.canvasGrid.getCanvasSizeInPlantPixels();
    const GROUND_LEVEL = plantPixelSize.height -  GROUND_HEIGHT;
    const SPROUT_POINT = GROUND_LEVEL - 4;

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
