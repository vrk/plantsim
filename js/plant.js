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
    this.totalSteps = 0;
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
      this.totalSteps++;
      const activeLeftStems = this.getActiveLeftStems();
      const activeRightStems = this.getActiveRightStems();
      for (const stem of [...activeLeftStems, ...activeRightStems]) {
        stem.grow();
      }
      if (activeLeftStems.length < 3) {
        const options = [...this.leftStems, this.leftStem];
        const chosen = Math.floor(Math.random() * options.length);
        options[chosen].sproutNewStem();
      }
      if (activeRightStems.length < 3) {
        const options = [...this.rightStems, this.rightStem];
        const chosen = Math.floor(Math.random() * options.length);
        options[chosen].sproutNewStem();
      }
    }
  }

  getAllStems() {
    const allStems = [];
    allStems.push(this.leftStem);
    allStems.push(this.rightStem);
    allStems.push(...this.leftStems);
    allStems.push(...this.rightStems);
    return allStems;
  }

  getActiveLeftStems() {
    return [...this.leftStems, this.leftStem].filter(stem => !stem.isGrown);
  }

  getActiveRightStems() {
    return [...this.rightStems, this.rightStem].filter(stem => !stem.isGrown);
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
