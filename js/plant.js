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

    this.leftStems = [];
    this.rightStems = [];
  }

  update() {
    this.canvasGrid.update(this.seedCol, this.seedRow, SEED_YELLOW);
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

      for (const stem of this.leftStems) {
        stem.grow();
      }
      for (const stem of this.rightStems) {
        stem.grow();
      }
    }
  }

  onNewLeftMiddleStem(leftMiddleStem) {
    this.leftStems.push(leftMiddleStem);
  }

  onNewRightMiddleStem(rightMiddleStem) {
    this.rightStems.push(rightMiddleStem);
  }

  bloom() {
    if (this.leftStem) {
      this.leftStem.bloom();
      this.rightStem.bloom();
      if (this.leftMiddleStem) {
        this.leftMiddleStem.bloom();
        this.rightMiddleStem.bloom();
      }
    }
  }
}
