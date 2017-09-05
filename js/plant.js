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

    this.bloomed = [];
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
      this.rightStem.setOnNewStemCallback(this.onNewRightMiddleStem);
    } else {
      this.totalSteps++;
      const activeLeftStems = this.getActiveLeftStems();
      const activeRightStems = this.getActiveRightStems();
      for (const stem of [...activeLeftStems, ...activeRightStems]) {
        stem.grow();
      }

      if (activeLeftStems.length < MAX_ACTIVE_STEMS / 2) {
        const options = [...this.leftStems, this.leftStem].filter(s => s.isSproutable());
        if (options.length > 0) {
          const chosen = Math.floor(Math.random() * options.length);
          options[chosen].sproutNewStem();
        }
      }
      if (activeRightStems.length < MAX_ACTIVE_STEMS / 2) {
        const options = [...this.rightStems, this.rightStem].filter(s => s.isSproutable());
        if (options.length > 0) {
          const chosen = Math.floor(Math.random() * options.length);
          options[chosen].sproutNewStem();
        }
      }

      if (this.totalSteps > BLOOM_STEPS) {
        this.bloom();
      }
      for (const bloom of this.bloomed) {
        bloom.grow();
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
    return [...this.leftStems, this.leftStem].filter(stem => !stem.isGrown && !stem.hasStrawberry);
  }

  getActiveRightStems() {
    return [...this.rightStems, this.rightStem].filter(stem => !stem.isGrown && !stem.hasStrawberry);
  }

  onNewLeftMiddleStem(leftMiddleStem) {
    this.leftStems.push(leftMiddleStem);
  }

  onNewRightMiddleStem(rightMiddleStem) {
    this.rightStems.push(rightMiddleStem);
  }

  bloom() {
    const activeLeftStems = this.getActiveLeftStems();
    const activeRightStems = this.getActiveRightStems();
    const allActive = [...activeLeftStems, ...activeRightStems];
    const bloomable = allActive.filter(s => s.canBloom());
    for (const stem of bloomable) {
      if (Math.random() < 0.2 && !this.bloomed.includes(stem)) {
        const result = stem.bloom();
        if (result) {
          this.bloomed.push(stem);
        }
      }
    }
  }
}
