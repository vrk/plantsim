class Plant {
  constructor(col, row, canvasGrid) {
    this.seedCol = col;
    this.seedRow = row;
    this.frontierCol = this.seedCol;
    this.frontierRow = this.seedRow;
    this.canvasGrid = canvasGrid;
    this.prevColDelta = 0;
  }

  update() {
    this.canvasGrid.update(this.seedCol, this.seedRow, '#FFA300');
  }

  updateNextSquare() {
    if (this.frontierRow >= 0 && this.seedRow != this.frontierRow) {
      this.canvasGrid.update(this.frontierCol, this.frontierRow, DARK_GREEN);
    }

    // Grow straight until we've broken ground.
    if (this.frontierRow >= PIXELS_WIDE -  GROUND_HEIGHT) {
      this.frontierRow--;
    } else {
      // Grow in a random direction -- weighted toward up.
      const random = Math.random();
      let colDelta = 0;
      if (random < 0.3 && this.prevColDelta != 1) {
        colDelta = -1;
      } else if (random < 0.6 && this.prevColDelta != -1) {
        colDelta = 1;
      } else {
        this.frontierCol += this.prevColDelta;
      }

      this.frontierCol = Math.min(PIXELS_WIDE - 1, Math.max(0, this.frontierCol + colDelta));
      if (this.prevColDelta != colDelta || colDelta == 0) {
        this.frontierRow--;
      }
      this.prevColDelta = colDelta;
    }
    this.canvasGrid.update(this.frontierCol, this.frontierRow, GREEN);
  }
}
