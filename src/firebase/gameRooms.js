import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

export const setGameRoomData = ({ gameId, values }) =>
  setDoc(doc(db, `game_rooms_dots/${gameId}`), values);

export const getGameRoomData = (id) =>
  getDoc(doc(db, "game_rooms_dots", id));

export const onSnapshotGame = (id, func) =>
  onSnapshot(doc(db, "game_rooms_dots", id), func);

export const updateGameRoomData = (gameId, values) =>
  updateDoc(doc(db, `game_rooms_dots/${gameId}`), values);

export const addPlayer = (gameId, values) =>
  updateDoc(doc(db, `game_rooms_dots/${gameId}`), {
    players_list: arrayUnion(values),
  });

export const removePlayer = (id, values) =>
  updateDoc(doc(db, "game_rooms_dots", id), {
    players_list: arrayRemove(values),
  });

export const banPlayer = (id, banned_player_uid, players_list) =>
  updateDoc(doc(db, "game_rooms_dots", id), {
    banned_player_uid: arrayUnion(banned_player_uid),
    players_list: players_list,
  });

export const deleteGameRoom = (id) =>
  deleteDoc(doc(db, "game_rooms_dots", id));

export const startGame = (id, newCurrentPlayerUid) => {
  const points = {};
  const gameBoard = {};

  for (let i = 0, pointIdx = 0; i < 25; i++) {
    const row = [];

    for (let y = 0; y < 25; y++) {
      row.push(`point-${pointIdx}`);

      points[`point-${pointIdx}`] = { number: 0 };
      pointIdx++;
    }

    gameBoard[i] = row;
  }

  return updateDoc(doc(db, "game_rooms_dots", id), {
    ongoing_game: true,
    current_player_uid: newCurrentPlayerUid,
    game_board: gameBoard,
    points,
  });
};

export const reset = (id, currentPlayerUid) => {
  updateDoc(doc(db, "game_rooms_dots", id), {
    current_player_uid: currentPlayerUid,
    ongoing_game: false,
    game_board: {},
    points: {},
  });
};

export const setPoint = (id, points, newCurrentPlayerUid) => {
  updateDoc(doc(db, "game_rooms_dots", id), {
    current_player_uid: newCurrentPlayerUid,
    points,
  });
};
