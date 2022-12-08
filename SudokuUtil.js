import { Util } from "./Util.js";

const SudokuUtil = {
  isValidPuzzle: function (grid) {
    for (let i = 0; i < grid.length; i++) {
      if (!isValidRow(grid, i)) {
        return false;
      }
      if (!isValidCol(grid, i)) {
        return false;
      }
    }
    if (!isValidBox(grid)) {
      return false;
    }
    return true;
  },

  isValidPlace: function (grid, row, column, number) {

    let localBoxRow = row - (row % 2);
    let localBoxCol = column - (column % 3);
   
    for (let i = localBoxRow; i < localBoxRow + 2; i++) {  
      for (let j = localBoxCol; j < localBoxCol + 3; j++) {   
        if (grid[i][j] === number) {
          return false;
        }
      }
    }
    for (let i = 0; i < 6; i++) {
      if (grid[i][column] === number) {
        return false;
      }
    }
    for (let i = 0; i < 6; i++) {
      if (grid[row][i] === number) {
        return false;
      }
    }
    
    return true;
  },
};

function isValidRow(grid, row) {
  let set = new Set();
  for (let i = 0; i < 6; i++) {
    let number = grid[row][i];
    if (number < 0 || number > 6) {
      return false;
    }
    if (set.has(number)) {
      return false;
    } else {
      number !== 0 && set.add(number);
    }
  }
  return true;
}

function isValidCol(grid, col) {
  let set = new Set();
  for (let i = 0; i < 6; i++) {
    let number = grid[i][col];
    if (number < 0 || number > 6) {
      return false;
    }
    if (set.has(number)) {
      return false;
    } else {
      number !== 0 && set.add(number);
    }
  }
  return true;
}
// row += 3
function isValidBox(grid) {
  for (let row = 0; row < grid.length; row +=2) {
    for (let column = 0; column < grid.length; column +=3) {
      let set = new Set();
      for (let subRow = 0; subRow < 2; subRow++) {
        for (let subCol = 0; subCol < 3; subCol++) {
          let number = grid[subRow][subCol];
          if (number < 0 || number > 6) {
            return false;
          }
          if (set.has(number)) {
            return false;
          } else {
            number !== 0 && set.add(number);
          }
        }
      }
    }
  }
  return true;
}

export { SudokuUtil };
