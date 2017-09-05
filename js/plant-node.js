class PlantNode {
  constructor(col, row, canvasGrid, parent, parentIndex) {
    // PlantNode[] neighbors
    this.neighbors =
    [null, null, null,
     null, null,
     null, null, null];

    // PlantNode parent
    if (parent) {
      this.parentIndex = parentIndex;
      this.neighbors[parentIndex] = parent;
    }

    this.col = col;
    this.row = row;

    this.canvasGrid = canvasGrid;
  }

  setColorIndex(index) {
    this.colorIndex = index;
  }

  // Returns a new random PlantNode that is connected to the current node.
  // Returns null if no new PlantNode could be grown.
  growNewNode(direction) {
    let spaces = this.getValidFrontierNeighbors();
    const topMiddle = spaces.filter(s => s === TOP_LEFT || s === MIDDLE_LEFT || s === TOP_MIDDLE);
    const right = spaces.filter(s => s === TOP_RIGHT || s === MIDDLE_RIGHT || s === TOP_MIDDLE);
    const other = spaces.filter(s => s === BOTTOM_MIDDLE || s === BOTTOM_RIGHT || s === BOTTOM_LEFT);
    const random = Math.random();
    if (direction === LEAN_LEFT) {
      if (spaces.includes(TOP_LEFT)) {
        spaces = topMiddle;
      }
    } else if (direction === LEAN_RIGHT) {
      if (spaces.includes(TOP_RIGHT)) {
        spaces = right;
      }
    }

    if (spaces.length === 0) {
      return null;
    }
    const indexIndex = Math.floor(Math.random() * spaces.length);
    const positionIndex = spaces[indexIndex];
    const deltas = this.getRowColDeltaFromIndex(positionIndex);
    const newCol = this.col + deltas.colDelta;
    const newRow = this.row + deltas.rowDelta;

    // const realColor = this.colorIndex !== undefined ? STEM_COLORS[this.colorIndex].primary : DARK_GREEN;
    // const frontColor = this.colorIndex !== undefined ? STEM_COLORS[this.colorIndex].secondary : GREEN;
    const realColor = DARK_GREEN;
    const frontColor = GREEN;
    this.canvasGrid.update(this.col, this.row, realColor);
    this.canvasGrid.update(newCol, newRow, frontColor);
    const newNodeParentIndex = this.getParentIndex(positionIndex);
    const newNode = new PlantNode(
        newCol, newRow, this.canvasGrid, this, newNodeParentIndex);
    newNode.setColorIndex(this.colorIndex);
    this.neighbors[positionIndex] = newNode;

    return newNode;
  }

  printDebug(message) {
    const colorChoice = STEM_COLORS[this.colorIndex];
    const highlightStyle = `color: ${colorChoice.secondary}; background-color: ${colorChoice.primary};`;
    console.log('%c' + message, highlightStyle);
  }

  getObivousTrajectory(index) {
    if (index === null) {
      return null;
    }

    // ***
    // *.*
    // ***
    switch(index) {
      case TOP_MIDDLE:
        return TRAVEL_DOWN;
      case TOP_LEFT:
        return TRAVEL_RIGHT_DOWN;
      case TOP_RIGHT:
        return TRAVEL_LEFT_DOWN;

      case BOTTOM_MIDDLE:
        return TRAVEL_UP;
      case BOTTOM_LEFT:
        return TRAVEL_RIGHT_UP;
      case BOTTOM_RIGHT:
        return TRAVEL_LEFT_UP;

      case MIDDLE_LEFT:
        return TRAVEL_RIGHT;
      case MIDDLE_RIGHT:
        return TRAVEL_LEFT;

      default:
        return null;
    }
  }

  isSpaceAvailable(c, r) {
    return this.canvasGrid.isInBounds(c, r) && !this.canvasGrid.isOccupied(c, r);
  }

  growLeaves() {
    const hasSpaceAbove =
        this.hasSpaceInRectangle(this.col, this.col + 3, this.row - 3, this.row);
    const hasSpaceBelow =
        this.hasSpaceInRectangle(this.col - 3, this.col, this.row, this.row + 3);

    if (!hasSpaceAbove && !hasSpaceBelow) {
      return;
    }

    let growAbove = hasSpaceAbove;
    if (hasSpaceAbove && hasSpaceBelow) {
      growAbove = Math.random() > 0.5;
    }

    if (growAbove) {
      console.assert(hasSpaceAbove);
      this.canvasGrid.update(this.col + 1, this.row - 2, GREEN);
      this.canvasGrid.update(this.col + 2, this.row - 2, GREEN);
      this.canvasGrid.update(this.col + 1, this.row - 1, GREEN);
    } else {
      console.assert(hasSpaceBelow);
      this.canvasGrid.update(this.col - 1, this.row + 2, GREEN);
      this.canvasGrid.update(this.col - 2, this.row + 1, GREEN);
      this.canvasGrid.update(this.col - 1, this.row + 1, GREEN);
    }
  }

  canBloom(width, height) {
    const trajectory = this.getTrajectory();
    let startCol;
    let endCol;
    let startRow;
    let endRow;
    if (trajectory === TRAVEL_UP) {
      // Check the N x N block above the current space.
      startCol = this.col - Math.floor(width / 2);
      endCol = this.col + Math.floor(width / 2); // inclusive
      startRow = this.row - height;
      endRow = this.row;  // inclusive
    } else if (trajectory === TRAVEL_LEFT) {
      startCol = this.col - width;
      endCol = this.col; // inclusive
      startRow = this.row - Math.floor(height / 2);
      endRow = this.row + Math.floor(height / 2);  // inclusive
    } else if (trajectory === TRAVEL_DOWN) {
      startCol = this.col - Math.floor(width / 2);
      endCol = this.col + Math.floor(width / 2); // inclusive
      startRow = this.row;
      endRow = this.row + height;  // inclusive
    } else if (trajectory === TRAVEL_RIGHT) {
      startCol = this.col;
      endCol = this.col + height; // inclusive
      startRow = this.row - Math.floor(height / 2);
      endRow = this.row + Math.floor(height / 2);  // inclusive
    }
    return this.hasSpaceInRectangle(startCol, endCol, startRow, endRow);
  }

  hasSpaceInRectangle(startCol, endCol, startRow, endRow) {
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        if (r === this.row && c === this.col) {
          continue;
        }
        if (!this.canvasGrid.isInBounds(c, r) || this.canvasGrid.isOccupied(c, r)) {
          return false;
        }
      }
    }
    return true;
  }

  reserveSpaceInRectangle(width, height) {
    const trajectory = this.getTrajectory();
    let startCol;
    let endCol;
    let startRow;
    let endRow;
    // TODO: Fix bounds for MEDIUM size strawberries
    if (trajectory === TRAVEL_UP) {
      // Check the N x N block above the current space.
      startCol = this.col - Math.floor(width / 2);
      endCol = this.col + Math.floor(width / 2); // inclusive
      startRow = this.row - height;
      endRow = this.row - 1;  // inclusive
    } else if (trajectory === TRAVEL_LEFT) {

      // TODO: Fix bug!!! Bounds wrong here.
      startCol = this.col - height;
      endCol = this.col - 1; // inclusive
      startRow = this.row - Math.floor(width / 2);
      endRow = this.row + Math.floor(width / 2);  // inclusive
    } else if (trajectory === TRAVEL_DOWN) {
      startCol = this.col - Math.floor(width / 2);
      endCol = this.col + Math.floor(width / 2); // inclusive
      startRow = this.row + 1;
      endRow = this.row + height;  // inclusive
    } else if (trajectory === TRAVEL_RIGHT) {
      startCol = this.col + 1;
      endCol = this.col + height; // inclusive
      startRow = this.row - Math.floor(width / 2);
      endRow = this.row + Math.floor(width / 2);  // inclusive
    }

    this.updateRect(startCol, endCol, startRow, endRow, 'black');
  }

  updateRect(startCol, endCol, startRow, endRow, color) {
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        this.canvasGrid.update(c, r, color);
      }
    }
  }

  getTrajectory() {
    if (this.parentIndex !== 0 && !this.parentIndex) {
      return TRAVEL_UP;
    }

    const firstDirection = this.getObivousTrajectory(this.parentIndex);
    if (firstDirection === TRAVEL_UP || firstDirection === TRAVEL_RIGHT ||
        firstDirection === TRAVEL_LEFT || firstDirection === TRAVEL_DOWN) {
      return firstDirection;
    }

    const parentParentIndex = this.neighbors[this.parentIndex].parentIndex;
    const secondDirection = this.getObivousTrajectory(parentParentIndex);

    if (secondDirection === TRAVEL_UP || secondDirection === TRAVEL_RIGHT ||
        secondDirection === TRAVEL_LEFT || secondDirection === TRAVEL_DOWN) {
      return secondDirection;
    }

    if (secondDirection === TRAVEL_LEFT_UP) {
      if (firstDirection === TRAVEL_LEFT_UP || firstDirection === TRAVEL_RIGHT_UP) {
        return TRAVEL_UP;
      }
      if (firstDirection === TRAVEL_LEFT_DOWN) {
        return TRAVEL_LEFT;
      }
    }
    if (secondDirection === TRAVEL_LEFT_DOWN) {
      if (firstDirection === TRAVEL_LEFT_DOWN || firstDirection === TRAVEL_RIGHT_DOWN) {
        return TRAVEL_DOWN;
      }
      if (firstDirection === TRAVEL_LEFT_UP) {
        return TRAVEL_LEFT;
      }
    }
    if (secondDirection === TRAVEL_RIGHT_UP) {
      if (firstDirection === TRAVEL_RIGHT_UP || firstDirection === TRAVEL_LEFT_UP) {
        return TRAVEL_UP;
      }
      if (firstDirection === TRAVEL_RIGHT_DOWN) {
        return TRAVEL_RIGHT;
      }
    }
    if (secondDirection === TRAVEL_RIGHT_DOWN) {
      if (firstDirection === TRAVEL_RIGHT_DOWN || firstDirection === TRAVEL_LEFT_DOWN) {
        return TRAVEL_DOWN;
      }
      if (firstDirection === TRAVEL_RIGHT_UP) {
        return TRAVEL_RIGHT;
      }
    }

    return TRAVEL_UP;
  }

  // |nodeIndex| is the location of the newly made node, and we're trying
  // to determine what the parent index should be then.
  getParentIndex(nodeIndex) {

    //  * * *
    //  * . *
    //  * * *

    switch(nodeIndex) {
      case TOP_LEFT:
        return BOTTOM_RIGHT;
      case TOP_MIDDLE:
        return BOTTOM_MIDDLE;
      case TOP_RIGHT:
        return BOTTOM_LEFT;

      case MIDDLE_LEFT:
        return MIDDLE_RIGHT;
      case MIDDLE_RIGHT:
        return MIDDLE_LEFT;

      case BOTTOM_LEFT:
        return TOP_RIGHT;
      case BOTTOM_MIDDLE:
        return TOP_MIDDLE;
      case BOTTOM_RIGHT:
        return TOP_LEFT;
    }
  }

  getRowColDeltaFromIndex(nodeIndex) {
    let colDelta = 0;
    // Handle col position
    switch(nodeIndex) {
      case TOP_LEFT:
      case MIDDLE_LEFT:
      case BOTTOM_LEFT:
        colDelta--;
        break;
      case TOP_RIGHT:
      case MIDDLE_RIGHT:
      case BOTTOM_RIGHT:
        colDelta++;
        break;
    }

    let rowDelta = 0;
    // Handle row position
    switch(nodeIndex) {
      case TOP_LEFT:
      case TOP_MIDDLE:
      case TOP_RIGHT:
        rowDelta--;
        break;
      case BOTTOM_LEFT:
      case BOTTOM_MIDDLE:
      case BOTTOM_RIGHT:
        rowDelta++;
        break;
    }

    return { colDelta, rowDelta };
  }

  // Returns the next node in the stem, null if there is none.
  // - If the stem forks, chooses randomly between the two nodes.
  getNextNode() {
    const parent = this.neighbors[this.parentIndex];
    const validNeighbors =
        this.neighbors.filter(n => n !== null && n !== parent);
    if (validNeighbors.length === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * validNeighbors.length);
    return validNeighbors[index];
  }

  // Returns the next node in the stem, null if there is none.
  // - If the stem forks, chooses randomly between the two nodes.
  getParent() {
    if (this.parentIndex === undefined) {
      return null;
    }
    return this.neighbors[this.parentIndex];
  }

  getValidFrontierNeighbors() {
    const spaces = [];
    for (const position of ALL_NODE_INDICES) {
      const deltas = this.getRowColDeltaFromIndex(position);

      const neighborCol = this.col + deltas.colDelta;
      const neighborRow = this.row + deltas.rowDelta;

      const potential = {
        col: neighborCol,
        row: neighborRow
      };

      if (!this.canvasGrid.isInBounds(neighborCol, neighborRow)) {
        continue;
      }

      if (this.canvasGrid.isOccupied(neighborCol, neighborRow)) {
        continue;
      }

      if (!this.hasSpaceForGrowth(potential, this.col, this.row)) {
        continue;
      }

      // Passes all checks! Add to spaces.
      spaces.push(position);
    }
    return spaces;
  }

  hasSpaceForGrowth(potential, parentCol, parentRow) {
    for (const position of ALL_NODE_INDICES) {
      const deltas = this.getRowColDeltaFromIndex(position);
      const neighborCol = potential.col + deltas.colDelta;
      const neighborRow = potential.row + deltas.rowDelta;

      // Ignore where you came from.
      if (neighborCol === parentCol && neighborRow === parentRow) {
        continue;
      }

      if (!this.canvasGrid.isInBounds(neighborCol, neighborRow)) {
        return false;
      }

      if (this.canvasGrid.isOccupied(neighborCol, neighborRow)) {
        return false;
      }
    }
    return true;
  }
}
