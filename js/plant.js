class Plant {
  constructor(col, row, canvasGrid) {
    this.seedCol = col;
    this.seedRow = row;
    this.canvasGrid = canvasGrid;
    this.prevColDelta = 0;
    this.stalk = new Stalk(col, row, this.canvasGrid);
    this.leftStem = null;
    this.rightStem = null;
    this.leftMiddleStem = null;
    this.rightMiddleStem = null;

    this.onNewLeftMiddleStem = this.onNewLeftMiddleStem.bind(this);
    this.onNewRightMiddleStem = this.onNewRightMiddleStem.bind(this);
  }

  update() {
    this.canvasGrid.update(this.seedCol, this.seedRow, YELLOW);
  }

  updateNextSquare() {
    if (!this.stalk.isGrown) {
      this.stalk.grow(this.canvasGrid);
    } else if (!this.leftStem) {
      console.assert(!this.rightStem);
      this.leftStem = this.stalk.getLeftStem();
      this.rightStem = this.stalk.getRightStem();

      this.leftStem.setOnNewStemCallback(this.onNewLeftMiddleStem);
      this.leftStem.setConstraints(LEAN_LEFT);

      this.rightStem.setOnNewStemCallback(this.onNewRightMiddleStem);
      this.rightStem.setConstraints(LEAN_RIGHT);
    } else {
      this.leftStem.grow();
      this.rightStem.grow();

      if (this.leftMiddleStem) {
        this.leftMiddleStem.grow();
      }
      if (this.rightMiddleStem) {
        this.rightMiddleStem.grow();
      }
    }
  }

  onNewLeftMiddleStem(leftMiddleStem) {
    this.leftMiddleStem = leftMiddleStem;
  }

  onNewRightMiddleStem(rightMiddleStem) {
    this.rightMiddleStem = rightMiddleStem;
  }
}
