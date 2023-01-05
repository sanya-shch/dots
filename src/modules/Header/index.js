import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import "./style.scss";

import gameStore from "../../store/gameStore";
import { ReactComponent as ResetSvg } from "../../assets/remove-icon.svg";
import { reset } from "../../firebase/gameRooms";

const Header = observer(({ id }) => {
  const navigate = useNavigate();

  const currentPlayerColor = gameStore.playersList.find(
    (item) => item.uid === gameStore.currentPlayerUid
  ).color;

  const handleClickReset = async () => {
    await reset(id, gameStore.playersList[0].uid);
  };

  return (
    <div
      className={`header_block ${
        gameStore.ongoingGame ? currentPlayerColor : ""
      }`}
    >
      <div className={`header_wrapper ${gameStore.ongoingGame ? "play" : ""}`}>
        <div className="title" onClick={() => navigate("/")}>
          DOTS
        </div>

        {gameStore.ongoingGame && (
          <div className="players_list">
            {gameStore.playersList.map((item) => (
              <div key={item.color} className={`player_item ${item.color}`}>
                <span>{item.username}</span>
              </div>
            ))}

            {gameStore.isHost && (
              <div className="info_block">
                <ResetSvg onClick={handleClickReset} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default Header;
