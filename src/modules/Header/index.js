import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import gameStore from "../../store/gameStore";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
  const navigate = useNavigate();

  const currentPlayerColor = gameStore.playersList.find(
    (item) => item.uid === gameStore.currentPlayerUid
  ).color;

  return (
    <div
      className={`header_block ${
        gameStore.ongoingGame ? currentPlayerColor : ""
      }`}
    >
      <div className="title" onClick={() => navigate("/")}>
        DOTS
      </div>

      {gameStore.ongoingGame && (
        <div className="players_list">
          {gameStore.playersList.map((item) => (
            <div key={item.color} className={`player_item ${item.color}`}>
              {item.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Header;
