export const checkPoint = (
  point,
  points,
  gameBoard,
  rowIndex,
  pointIndex,
  colorsData
) => {
  const board = gameBoard.map((row) => row.map((item) => item));
  const pointsList = [];
  let initial = true;

  const getValidWays = (rowIdx, pointIdx, finishRowIdx, finishPointIdx) => {
    const list = [];
    console.log(rowIdx, pointIdx, finishRowIdx, finishPointIdx);
    if (board[rowIdx - 1] !== undefined) {
      // 0 1 0
      // 0 * 0
      // 0 0 0

      list.push({ rowIdx: rowIdx - 1, pointIdx });
    }
    if (board[rowIdx + 1] !== undefined) {
      // 0 0 0
      // 0 * 0
      // 0 5 0

      list.push({ rowIdx: rowIdx + 1, pointIdx });
    }
    if (board[rowIdx][pointIdx - 1] !== undefined) {
      // 0 0 0
      // 7 * 0
      // 0 0 0

      list.push({ rowIdx, pointIdx: pointIdx - 1 });
    }
    if (board[rowIdx][pointIdx + 1] !== undefined) {
      // 0 0 0
      // 0 * 3
      // 0 0 0

      list.push({ rowIdx, pointIdx: pointIdx + 1 });
    }

    if (board[rowIdx - 1]?.[pointIdx + 1] !== undefined) {
      // 0 0 1
      // 0 * 0
      // 0 0 0

      list.push({ rowIdx: rowIdx - 1, pointIdx: pointIdx + 1 });
    }
    if (board[rowIdx + 1]?.[pointIdx + 1] !== undefined) {
      // 0 0 0
      // 0 * 0
      // 0 0 1

      list.push({ rowIdx: rowIdx + 1, pointIdx: pointIdx + 1 });
    }
    if (board[rowIdx + 1]?.[pointIdx - 1] !== undefined) {
      // 0 0 0
      // 0 * 0
      // 1 0 0

      list.push({ rowIdx: rowIdx + 1, pointIdx: pointIdx - 1 });
    }
    if (board[rowIdx - 1]?.[pointIdx - 1] !== undefined) {
      // 1 0 0
      // 0 * 0
      // 0 0 0

      list.push({ rowIdx: rowIdx - 1, pointIdx: pointIdx - 1 });
    }

    return list.filter(
      (item) =>
        points[gameBoard[item.rowIdx][item.pointIdx]].number === colorsData[0]
      // (item.rowIdx === finishRowIdx && item.pointIdx === finishPointIdx)
    );
  };

  const checkPath = (
    startRowIdx,
    startPointIdx,
    finishRowIdx,
    finishPointIdx
  ) => {
    board[startRowIdx][startPointIdx] = 5;

    const ways = getValidWays(
      startRowIdx,
      startPointIdx,
      finishRowIdx,
      finishPointIdx
    );
    console.log({ startRowIdx, startPointIdx });
    console.log(ways);
    if (ways.length > 0) {
      for (let i = 0; i < ways.length; i++) {
        const current = ways[i];

        const isSolved =
          current.rowIdx === finishRowIdx &&
          current.pointIdx === finishPointIdx;
        const notVisited = board[current.rowIdx][current.pointIdx] !== 5;

        const isAllWaysWalked = ways
          .filter(
            (item) =>
              item.rowIdx !== finishRowIdx && item.pointIdx !== finishPointIdx
          )
          .every((item) => board[item.rowIdx][item.pointIdx] === 5);
        console.log({i,initial, isSolved, notVisited, current, isAllWaysWalked, board: board.map((row) => row.map((item) => points[item]?.number)) });
        if (isSolved && isAllWaysWalked) {
          // if (initial) {
          //   initial = false;
          // } else {
            console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqq", current);
            pointsList.push(current);
            return { rowIdx: finishRowIdx, pointIdx: finishPointIdx };
          // }
        }
        if (notVisited) {
          const path = checkPath(
            current.rowIdx,
            current.pointIdx,
            finishRowIdx,
            finishPointIdx
          );
          console.log("pathpathpathpath", path);
          if (path) {
            console.log("currentcurrentcurrent", current, path);
            pointsList.push(current);
            return current;
          }
        }
      }
    }

    return false;
  };

  checkPath(rowIndex, pointIndex, rowIndex, pointIndex);

  console.log(
    // gameBoard.map((row) => row.map((item) => points[item].number)),
    board.map((row) => row.map((item) => points[item]?.number)),
    // board.map((row) => row.map((item) => item)),
    pointsList
  );
  return pointsList;
};
