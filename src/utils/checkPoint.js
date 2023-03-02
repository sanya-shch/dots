export const checkPoint = (
  points,
  gameBoard,
  rowIndex,
  pointIndex,
  colorsData
) => {
  const board = gameBoard.map((row) => row.map((item) => item));

  const getValidWays = (rowIdx, pointIdx) => {
    const list = [];

    if (board[rowIdx - 1] !== undefined) {
      // 0 1 0
      // 0 * 0
      // 0 0 0

      list.push({ rowIdx: rowIdx - 1, pointIdx });
    }
    if (board[rowIdx - 1]?.[pointIdx + 1] !== undefined) {
      // 0 0 2
      // 0 * 0
      // 0 0 0

      list.push({ rowIdx: rowIdx - 1, pointIdx: pointIdx + 1 });
    }
    if (board[rowIdx][pointIdx + 1] !== undefined) {
      // 0 0 0
      // 0 * 3
      // 0 0 0

      list.push({ rowIdx, pointIdx: pointIdx + 1 });
    }
    if (board[rowIdx + 1]?.[pointIdx + 1] !== undefined) {
      // 0 0 0
      // 0 * 0
      // 0 0 4

      list.push({ rowIdx: rowIdx + 1, pointIdx: pointIdx + 1 });
    }
    if (board[rowIdx + 1] !== undefined) {
      // 0 0 0
      // 0 * 0
      // 0 5 0

      list.push({ rowIdx: rowIdx + 1, pointIdx });
    }
    if (board[rowIdx + 1]?.[pointIdx - 1] !== undefined) {
      // 0 0 0
      // 0 * 0
      // 6 0 0

      list.push({ rowIdx: rowIdx + 1, pointIdx: pointIdx - 1 });
    }
    if (board[rowIdx][pointIdx - 1] !== undefined) {
      // 0 0 0
      // 7 * 0
      // 0 0 0

      list.push({ rowIdx, pointIdx: pointIdx - 1 });
    }
    if (board[rowIdx - 1]?.[pointIdx - 1] !== undefined) {
      // 8 0 0
      // 0 * 0
      // 0 0 0

      list.push({ rowIdx: rowIdx - 1, pointIdx: pointIdx - 1 });
    }

    return list.filter(
      (item) =>
        points[gameBoard[item.rowIdx][item.pointIdx]].number === colorsData[0]
    );
  };

  const checkPath = (
    startRowIdx,
    startPointIdx,
    finishRowIdx,
    finishPointIdx,
    lastRowIdx,
    lastPointIdx
  ) => {
    const ways = getValidWays(startRowIdx, startPointIdx).filter(
      ({ rowIdx, pointIdx }) =>
        board[rowIdx][pointIdx] !== 5 &&
        board[rowIdx][pointIdx] !== 4 &&
        !(lastRowIdx === rowIdx && lastPointIdx === pointIdx)
    );

    if (ways.length === 0) {
      return false;
    }

    for (let i = 0; i < ways.length; i++) {
      const current = ways[i];

      if (board[current.rowIdx][current.pointIdx] === 10) {
        return [{ rowIdx: finishRowIdx, pointIdx: finishPointIdx }];
      }

      board[current.rowIdx][current.pointIdx] = 5;

      const path = checkPath(
        current.rowIdx,
        current.pointIdx,
        finishRowIdx,
        finishPointIdx,
        startRowIdx,
        startPointIdx
      );

      if (path) {
        return [current, ...path];
      } else {
        board[current.rowIdx][current.pointIdx] = 4;
      }
    }
  };

  board[rowIndex][pointIndex] = 10;

  const pointsList = checkPath(rowIndex, pointIndex, rowIndex, pointIndex, rowIndex, pointIndex);

  return pointsList?.length >= 4 ? pointsList : [];
};
