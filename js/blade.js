class Blade {
  constructor(canvasGrid) {
    this.canvasGrid = canvasGrid;
    this.points = [];
  }

  addBladePoint(col, row) {
    this.points.push({col, row});
  }

  draw() {
    if (this.points.length === 0) {
      return;
    }

    let firstPoint = this.points[0];
    this.drawPoint(firstPoint);

    for (let i = 1; i < this.points.length; i++) {
      const nextPoint = this.points[i];
      this.drawPoint(nextPoint);


      // // Draw from firstPoint to nextPoint
      //
      // // *     *
      const colDelta = nextPoint.col - firstPoint.col;
      const rowDelta = nextPoint.row - firstPoint.row;
      const colsPerRow = Math.floor(colDelta / (rowDelta + 1));
      //
      // // rowDelta = 0
      // // colDelta = 4
      //
      const colStep = colDelta < 0 ? -1 : 1;
      const rowStep = rowDelta < 0 ? -1 : 1;
      //
      // let colBound = nextPoint.col;
      //
      let iCol = firstPoint.col;
      let iRow = firstPoint.row;
      while (iCol !== nextPoint.col || iRow !== nextPoint.row) {
        this.drawPoint({col: iCol, row: iRow});

        if (iRow !== nextPoint.row) {
          iRow += rowStep;
        }
        if (iCol !== nextPoint.col) {
          iCol += colStep;
        }
      }
      //
      //
      //
      //
      // // Update |firstPoint|
      firstPoint = nextPoint;
    }
  }

  clear() {
    this.points = [];
  }

  drawPoint(point) {
    this.canvasGrid.drawSquare(point.col, point.row, LIGHT_GRAY);
  }
}
