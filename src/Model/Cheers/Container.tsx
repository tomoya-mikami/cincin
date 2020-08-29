import io from "socket.io-client";
import { RoomId, ResponseObj } from "../../Const/RoomId";

const socket = io("https://spajam-satori.an.r.appspot.com", {
  transports: ["websocket"],
});

export const JoinRoom = (roomId: RoomId): void => {
  socket.emit("join", roomId);
  return;
};

export const SendCheer = (roomId: RoomId, time: number): void => {
  socket.emit("cheer", { roomId, time });
  return;
};

export const SetCheeredListener = (
  setCheered: React.Dispatch<React.SetStateAction<ResponseObj>>
): void => {
  socket.on("cheered", (msg: ResponseObj) => {
    setCheered(msg);
    return;
  });
};
