import React from "react";
import { observer } from "mobx-react-lite";

import "./style.scss";

import gameStore from "../../store/gameStore";
import { setPoint } from "../../firebase/gameRooms";
import { getNextPlayerUid } from "../../utils/getNextPlayerUid";
import { colors, colorsData, pointColors } from "../../constants";
import { checkPoint } from "../../utils/checkPoint";
import { fillBlock } from "../../utils/fillBlock";
import { addWallToPoints } from "../../utils/addWallToPoints";

const GameBlock = observer(({ id }) => {
  // const [pointsWall, setPointsWall] = useState(null);

  const currentPlayerColor = gameStore.playersList.find(
    (item) => item.uid === gameStore.currentPlayerUid
  ).color;

  const handleClick = async ({ point, rowIndex, pointIndex }) => {
    if (
      gameStore.points[point].number === 0 &&
      gameStore.currentPlayerUid === gameStore.uuid
    ) {
      const nextPlayerUid = getNextPlayerUid(
        gameStore.playersList,
        gameStore.currentPlayerUid
      );

      // const currentPlayerIndex = gameStore.playersList.findIndex(
      //   (item) => item.uid === gameStore.currentPlayerUid
      // );

      const pointsList = checkPoint(
        {
          ...gameStore.points,
          [point]: {
            ...gameStore.points[point],
            number: colorsData[currentPlayerColor][0],
          },
        },
        Object.values(gameStore.gameBoard),
        rowIndex,
        pointIndex,
        colorsData[currentPlayerColor]
      );

      const pointsWall = addWallToPoints(
        pointsList,
        {
          ...gameStore.points,
          [point]: {
            ...gameStore.points[point],
            number: colorsData[currentPlayerColor][0],
          },
        },
        Object.values(gameStore.gameBoard)
      );

      const filledPointsBoard = fillBlock(
        pointsList,
        {
          ...gameStore.points,
          ...pointsWall,
          [point]: {
            ...gameStore.points[point],
            number: colorsData[currentPlayerColor][0],
          },
        },
        Object.values(gameStore.gameBoard),
        colorsData[currentPlayerColor]
      );
      gameStore.points = { ...gameStore.points, ...pointsWall };
      await setPoint(
        id,
        {
          ...gameStore.points,
          ...filledPointsBoard,
          ...pointsWall,
          [point]: {
            ...gameStore.points[point],
            ...pointsWall[point],
            number: colorsData[currentPlayerColor][0],
          },
        },
        nextPlayerUid
      );
    }
  };

  // const handleMouseEnter = ({ point, rowIndex, pointIndex }) => {
  //   // const pointsList = checkPoint(
  //   //   point,
  //   //   {
  //   //     ...gameStore.points,
  //   //     [point]: {
  //   //       ...gameStore.points[point],
  //   //       number: colorsData[currentPlayerColor][0],
  //   //     },
  //   //   },
  //   //   Object.values(gameStore.gameBoard),
  //   //   rowIndex,
  //   //   pointIndex,
  //   //   colorsData[currentPlayerColor],
  //   // );
  //   //
  //   // if (pointsList.length > 0) setPointsWall(pointsList);
  // };

  // const handleMouseLeave = () => {
  //   // setPointsWall(null);
  // };

  return (
    <div className={`game_block ${currentPlayerColor}`}>
      <div className="game_board">
        {Object.values(gameStore.gameBoard).map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="row">
            {row.map((point, pointIndex) => (
              <div
                key={`point-${pointIndex}`}
                className={`point ${
                  gameStore.currentPlayerUid === gameStore.uuid ? "" : "without"
                } ${
                  gameStore.points[point].number === 1 ||
                  gameStore.points[point].number === 2 ||
                  gameStore.points[point].number === 3 ||
                  gameStore.points[point].number === 4
                    ? "colored"
                    : ""
                } ${gameStore.points[point].number === 0 ? "" : "not_hover"}`}
                style={{
                  "--clr": pointColors[gameStore.points[point].number],
                  "--hoverclr": colors[currentPlayerColor],
                }}
                onClick={() => handleClick({ point, rowIndex, pointIndex })}
                // onMouseEnter={() =>
                //   handleMouseEnter({ point, rowIndex, pointIndex })
                // }
                // onMouseLeave={handleMouseLeave}
              >
                {Object.keys(gameStore.points[point].walls || {}).map(
                  (item) => (
                    <span key={`wall-${item}`} className={`wall_${item}`} />
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default GameBlock;
