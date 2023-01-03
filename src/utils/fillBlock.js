const isPointInUp = (row, point, clearBoard) => {
  for (let i = row - 1; i >= 0; i--) {
    if (clearBoard[i][point]) {
      return true;
    }
  }

  return false;
};
const isPointInDown = (row, point, clearBoard) => {
  for (let i = row + 1; i < clearBoard.length; i++) {
    if (clearBoard[i][point]) {
      return true;
    }
  }

  return false;
};
const isPointInLeft = (row, point, clearBoard) => {
  for (let i = point - 1; i >= 0; i--) {
    if (clearBoard[row][i]) {
      return true;
    }
  }

  return false;
};
const isPointInRight = (row, point, clearBoard) => {
  for (let i = point + 1; i < clearBoard[0].length; i++) {
    if (clearBoard[row][i]) {
      return true;
    }
  }

  return false;
};

const isPointIn = (row, point, clearBoard) => {
  return (
    isPointInUp(row, point, clearBoard) &&
    isPointInDown(row, point, clearBoard) &&
    isPointInLeft(row, point, clearBoard) &&
    isPointInRight(row, point, clearBoard)
  );
};

export const fillBlock = (pointsList, points, gameBoard, colorsData) => {
  const pointsResult = {};

  const pointsData = pointsList.reduce((acc, item) => {
    acc[`${item.rowIdx}_${item.pointIdx}`] = item;

    return acc;
  }, {});

  const board = gameBoard.map((row) => row.map((item) => item));
  const clearBoard = gameBoard.map((row, rowIdx) =>
    row.map((item, pointIdx) => (pointsData[`${rowIdx}_${pointIdx}`] ? 1 : 0))
  );

  for (let row = 0; row < board.length; row++) {
    for (let point = 0; point < board[0].length; point++) {
      if (isPointIn(row, point, clearBoard)) {
        const pointItem = board[row][point];

        if (points[pointItem].number === 0) {
          pointsResult[pointItem] = {
            ...points[pointItem],
            number: colorsData[1],
          };
        }

        if (
          points[pointItem].number === 1 &&
          points[pointItem].number !== colorsData[0]
        ) {
          pointsResult[pointItem] = {
            ...points[pointItem],
            number: colorsData[2][0],
          };
        }
        if (
          points[pointItem].number === 2 &&
          points[pointItem].number !== colorsData[0]
        ) {
          pointsResult[pointItem] = {
            ...points[pointItem],
            number: colorsData[2][1],
          };
        }
        if (
          points[pointItem].number === 3 &&
          points[pointItem].number !== colorsData[0]
        ) {
          pointsResult[pointItem] = {
            ...points[pointItem],
            number: colorsData[2][2],
          };
        }
        if (
          points[pointItem].number === 4 &&
          points[pointItem].number !== colorsData[0]
        ) {
          pointsResult[pointItem] = {
            ...points[pointItem],
            number: colorsData[2][3],
          };
        }
      }
    }
  }

  return pointsResult;
};
