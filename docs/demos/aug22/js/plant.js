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

  createLeftConstraints() {
    return {};
  }
  updateNextSquare() {
    if (!this.stalk.isGrown) {
      this.stalk.grow(this.canvasGrid);
    } else if (!this.leftStem) {
      console.assert(!this.rightStem);
      this.leftStem = this.stalk.getLeftStem();
      this.rightStem = this.stalk.getRightStem();

      this.leftStem.setConstraints(LEAN_LEFT);
      this.rightStem.setConstraints(LEAN_RIGHT);
    } else {
      this.leftStem.grow();
      this.rightStem.grow();
    }
  }
}
