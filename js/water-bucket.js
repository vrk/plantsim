class WaterBucket {
  constructor(canvasGrid, canvasElement) {
    this.canvasGrid = canvasGrid;
    this.canvasElement = canvasElement;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragMove = this.onDragMove.bind(this);

    this.cloud = [];

    this.cursorCol = null;
    this.cursorRow = null;
    this.prevCursorCol = null;
    this.prevCursorRow = null;

    this.dropsInARow = 0;
  }

  update() {
    for (const rainDrop of this.cloud) {
      rainDrop.update();
    }
    if (this.cursorCol && this.cursorRow) {
      if (this.prevCursorCol === this.cursorCol &&
          this.prevCursorRow === this.prevCursorRow) {
        this.dropsInARow++;
      } else {
        this.dropsInARow = 0;
      }

      if (this.dropsInARow % MAX_DROPS_IN_A_ROW === 0) {
        this.addRainDrop(this.cursorCol, this.cursorRow);
      }
      this.prevCursorCol = this.cursorCol;
      this.prevCursorRow = this.cursorRow;
    }

    this.cloud = this.cloud.filter(drop => drop.isActive());
  }

  draw() {
    for (const rainDrop of this.cloud) {
      rainDrop.draw();
    }
  }

  startRaining(col, row) {
    this.canvasElement.addEventListener('mouseup', this.onDragEnd);
    this.canvasElement.addEventListener('mousemove', this.onDragMove);
    this.cursorCol = col;
    this.cursorRow = row;
  }

  addRainDrop(col, row) {
    const rainDrop = new RainDrop(this.canvasGrid, col, row);
    this.cloud.push(rainDrop);
  }

  // Stops adding active
  onDragEnd() {
    this.canvasElement.removeEventListener('mouseup', this.onDragEnd);
    this.canvasElement.removeEventListener('mousemove', this.onDragMove);
    this.cursorCol = null;
    this.cursorRow = null;
  }

  onDragMove(event) {
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const realPixelSize = this.canvasGrid.getCanvasSizeInRealPixels();
    const plantPixelSize = this.canvasGrid.getCanvasSizeInPlantPixels();
    const col = Math.floor(xPos / realPixelSize.width * plantPixelSize.width);
    const row = Math.floor(yPos / realPixelSize.height * plantPixelSize.height);

    this.cursorCol = col;
    this.cursorRow = row;
  }
}
