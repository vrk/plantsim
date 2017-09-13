class Scissors {
  constructor(canvasGrid, canvasElement) {
    this.canvasGrid = canvasGrid;
    this.canvasElement = canvasElement;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragMove = this.onDragMove.bind(this);

    this.blade = new Blade(this.canvasGrid);
  }

  update() {
    if (this.cursorCol && this.cursorRow) {
      this.blade.addBladePoint(this.cursorCol, this.cursorRow);
    }
  }

  draw() {
    this.blade.draw();
  }

  startCutting(col, row) {
    this.canvasElement.addEventListener('mouseup', this.onDragEnd);
    this.canvasElement.addEventListener('mousemove', this.onDragMove);
    this.cursorCol = col;
    this.cursorRow = row;
  }

  // Stops adding active
  onDragEnd() {
    this.canvasElement.removeEventListener('mouseup', this.onDragEnd);
    this.canvasElement.removeEventListener('mousemove', this.onDragMove);
    this.cursorCol = null;
    this.cursorRow = null;
    this.blade.clear();
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
