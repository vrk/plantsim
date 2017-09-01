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

      // if (activeLeftStems.length < 3) {
      //   console.log('need more left');
      //   const options = [...this.leftStems, this.leftStem].filter(s => s.isSproutable());
      //   if (options.length > 0) {
      //     const chosen = Math.floor(Math.random() * options.length);
      //     options[chosen].sproutNewStem();
      //   }
      // }
      // if (activeRightStems.length < 3) {
      //   console.log('need more right');
      //   const options = [...this.rightStems, this.rightStem].filter(s => s.isSproutable());
      //   if (options.length > 0) {
      //     const chosen = Math.floor(Math.random() * options.length);
      //     options[chosen].sproutNewStem();
      //   }
      // }
      //
      // if (this.totalSteps > BLOOM_STEPS) {
      //   this.bloom();
      // }
      // for (const bloom of this.bloomed) {
      //   bloom.grow();
      // }
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
      if (Math.random() < 0.1 && !this.bloomed.includes(stem)) {
        stem.bloom();
        this.bloomed.push(stem);
      }
    }
    // if (bloomable.length > 0) {
    //   const index = Math.floor(Math.random() * bloomable.length);
    //   const stem = bloomable[index];
    //   this.bloomed.push(stem);
    // }
  }
}
