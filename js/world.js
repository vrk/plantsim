class World {
  constructor() {
    this.canvasElement = document.querySelector('canvas');
    this.canvasGrid = new CanvasGrid(this.canvasElement);
    this.onCanvasClicked = this.onCanvasClicked.bind(this);

    this.ground = new Ground(this.canvasGrid);
    this.mode = null;
  }

  initialize() {
    this.ground.initialize();
    this.canvasElement.addEventListener('click', this.onCanvasClicked);
  }

  setMode(mode) {
    this.mode = mode;
  }

  draw() {
    this.canvasGrid.draw();
  }

  onCanvasClicked(event) {
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const realPixelSize = this.canvasGrid.getCanvasSizeInRealPixels();
    const plantPixelSize = this.canvasGrid.getCanvasSizeInPlantPixels();
    const col = Math.floor(xPos / realPixelSize.width * plantPixelSize.width);
    const row = Math.floor(yPos / realPixelSize.height * plantPixelSize.height);

    if (this.mode === GOD_MODE) {
      this.growPlant(col, row);
    } else if (this.mode === WATER_MODE) {
      console.log('water');
      const rainDrop = new RainDrop(this.canvasGrid);
      rainDrop.update(col, row);
      rainDrop.draw();
    }

    this.draw();
  }

  growPlant(col, row) {
    const realPixelSize = this.canvasGrid.getCanvasSizeInRealPixels();
    const plantPixelSize = this.canvasGrid.getCanvasSizeInPlantPixels();
    const groundLevel = plantPixelSize.height -  GROUND_HEIGHT;
    if (this.plant) {
      this.plant.updateNextSquare();
    } else if (row > groundLevel && row < plantPixelSize.height - GROUND_HEIGHT / 2) {
      this.plant = this.ground.addSeed(col, row);
    }
  }

  debugStep(n = 1) {
    if (!this.plant) {
      return;
    }

    for (let i = 1; i <= n; i++) {
      this.plant.updateNextSquare();
      this.draw();
    }
  }

  bloom() {
    if (!this.plant) {
      return;
    }
    this.plant.bloom();
    this.draw();
  }
}
