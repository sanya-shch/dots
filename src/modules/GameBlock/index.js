import React from "react";
import { observer } from "mobx-react-lite";

import "./style.scss";

import gameStore from "../../store/gameStore";
import { reset, setPoint } from "../../firebase/gameRooms";
import { getNextPlayerUid } from "../../utils/getNextPlayerUid";
import { ReactComponent as ResetSvg } from "../../assets/remove-icon.svg";
import { colors, colorsData, pointColors } from "../../constants";

const GameBlock = observer(({ id }) => {
  const currentPlayerColor = gameStore.playersList.find(
    (item) => item.uid === gameStore.currentPlayerUid
  ).color;

  const handleClick = async ({ point }) => {
    if (
      gameStore.points[point] === 0 &&
      gameStore.currentPlayerUid === gameStore.uuid
    ) {
      const nextPlayerUid = getNextPlayerUid(
        gameStore.playersList,
        gameStore.currentPlayerUid
      );

      // const currentPlayerIndex = gameStore.playersList.findIndex(
      //   (item) => item.uid === gameStore.currentPlayerUid
      // );

      await setPoint(
        id,
        { ...gameStore.points, [point]: colorsData[currentPlayerColor][0] },
        nextPlayerUid
      );
    }
  };

  const handleClickReset = async () => {
    await reset(id, gameStore.playersList[0].uid);
  };

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
                } ${gameStore.points[point] ? "colored" : ""}`}
                style={{
                  "--clr": pointColors[gameStore.points[point]],
                  "--hoverclr": colors[currentPlayerColor],
                }}
                onClick={() => handleClick({ point })}
              >
                <span />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="info_block">
        {gameStore.isHost && gameStore.ongoingGame && (
          <ResetSvg onClick={handleClickReset} />
        )}
      </div>
    </div>
  );
});

export default GameBlock;
