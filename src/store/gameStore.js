import { makeAutoObservable } from "mobx";

import { snakeToCamel } from "../utils/snakeToCamel";
import { getUserId } from "../utils/getUserId";

class GameStore {
  gameRoomClosed = false;
  bannedPlayersUidList = [];
  currentPlayerUid = null;
  playersList = [];
  ongoingGame = false;

  gameBoard = {};
  points = {};

  hostUid = null;
  isHost = false;

  isStartModalOpen = false;
  isWaitStart = false;

  uuid = getUserId();

  constructor() {
    makeAutoObservable(this);
  }

  setIsStartModalOpen(value) {
    this.isStartModalOpen = value;
  }

  setGameData(gameData, navigate) {
    const convertedData = Object.entries(gameData).reduce(
      (acc, [key, value]) => {
        const newKey = snakeToCamel(key);

        acc[newKey] = value;

        return acc;
      },
      {}
    );

    Object.entries(convertedData).forEach(([key, value]) => {
      // console.log(key);
      this[key] = value;
    });

    // set isHost
    this.isHost = this.hostUid === this.uuid;

    // checkIfUserExists
    let userExists = false;
    this.playersList.forEach((element) => {
      if (this.uuid === element.uid) {
        userExists = true;
      }
    });
    if (!userExists) {
      this.isStartModalOpen = true;
      this.isWaitStart = false;
    } else if (this.playersList.length > 2) {
      console.error("There are too many players in this game");
      navigate("/");
    } else {
      this.isWaitStart = true;
    }
  }
}

export default new GameStore();
