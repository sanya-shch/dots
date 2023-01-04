export const addWallToPoints = (pointsList, points, gameBoard) => {
  const pointsWall = {};

  for (let i = 0; i < pointsList.length; i++) {
    const pointItem = gameBoard[pointsList[i].rowIdx][pointsList[i].pointIdx];

    const next =
      i + 1 === pointsList.length ? pointsList[0] : pointsList[i + 1];

    if (
      pointsList[i].rowIdx === next.rowIdx - 1 &&
      pointsList[i].pointIdx === next.pointIdx
    ) {
      pointsWall[pointItem] = {
        ...points[pointItem],
        walls: {
          ...points[pointItem].walls,
          ...(pointsWall[pointItem]?.walls ? pointsWall[pointItem].walls : {}),
          1: 1,
        },
      };
    }

    if (
      pointsList[i].rowIdx === next.rowIdx - 1 &&
      pointsList[i].pointIdx === next.pointIdx + 1
    ) {
      pointsWall[pointItem] = {
        ...points[pointItem],
        walls: {
          ...points[pointItem].walls,
          ...(pointsWall[pointItem]?.walls ? pointsWall[pointItem].walls : {}),
          2: 2,
        },
      };
    }

    if (
      pointsList[i].rowIdx === next.rowIdx &&
      pointsList[i].pointIdx === next.pointIdx + 1
    ) {
      pointsWall[pointItem] = {
        ...points[pointItem],
        walls: {
          ...points[pointItem].walls,
          ...(pointsWall[pointItem]?.walls ? pointsWall[pointItem].walls : {}),
          3: 3,
        },
      };
    }

    if (
      pointsList[i].rowIdx === next.rowIdx + 1 &&
      pointsList[i].pointIdx === next.pointIdx + 1
    ) {
      pointsWall[pointItem] = {
        ...points[pointItem],
        walls: {
          ...points[pointItem].walls,
          ...(pointsWall[pointItem]?.walls ? pointsWall[pointItem].walls : {}),
          4: 4,
        },
      };
    }

    if (
      pointsList[i].rowIdx === next.rowIdx + 1 &&
      pointsList[i].pointIdx === next.pointIdx
    ) {
      pointsWall[pointItem] = {
        ...points[pointItem],
        walls: {
          ...points[pointItem].walls,
          ...(pointsWall[pointItem]?.walls ? pointsWall[pointItem].walls : {}),
          5: 5,
        },
      };
    }

    if (
      pointsList[i].rowIdx === next.rowIdx + 1 &&
      pointsList[i].pointIdx === next.pointIdx - 1
    ) {
      pointsWall[pointItem] = {
        ...points[pointItem],
        walls: {
          ...points[pointItem].walls,
          ...(pointsWall[pointItem]?.walls ? pointsWall[pointItem].walls : {}),
          6: 6,
        },
      };
    }

    if (
      pointsList[i].rowIdx === next.rowIdx &&
      pointsList[i].pointIdx === next.pointIdx - 1
    ) {
      pointsWall[pointItem] = {
        ...points[pointItem],
        walls: {
          ...points[pointItem].walls,
          ...(pointsWall[pointItem]?.walls ? pointsWall[pointItem].walls : {}),
          7: 7,
        },
      };
    }

    if (
      pointsList[i].rowIdx === next.rowIdx - 1 &&
      pointsList[i].pointIdx === next.pointIdx - 1
    ) {
      pointsWall[pointItem] = {
        ...points[pointItem],
        walls: {
          ...points[pointItem].walls,
          ...(pointsWall[pointItem]?.walls ? pointsWall[pointItem].walls : {}),
          8: 8,
        },
      };
    }
  }

  return pointsWall;
};
