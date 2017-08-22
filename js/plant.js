class Plant {
  constructor(col, row, canvasGrid) {
    this.seedCol = col;
    this.seedRow = row;
    this.canvasGrid = canvasGrid;
    this.prevColDelta = 0;
    this.stalk = new Stalk(col, row, this.canvasGrid);
    this.leftStem = null;
    this.rightStem = null;
  }

  update() {
    this.canvasGrid.update(this.seedCol, this.seedRow, '#FFA300');
  }

  updateNextSquare() {
    // Change current frontier color to dark green.
    if (this.frontierRow >= 0 && this.seedRow != this.frontierRow) {
      this.canvasGrid.update(this.frontierCol, this.frontierRow, DARK_GREEN);
    }

    if (!this.stalk.isGrown) {
      this.stalk.grow(this.canvasGrid);
    } else if (!this.leftStem) {
      console.assert(!this.rightStem);
      this.leftStem = this.stalk.getLeftStem();
      this.rightStem = this.stalk.getRightStem();
    } else {
      this.leftStem.grow(this.canvasGrid);
      this.rightStem.grow(this.canvasGrid);
    }
  }
}
