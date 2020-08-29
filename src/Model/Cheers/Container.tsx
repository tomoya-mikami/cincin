import io from "socket.io-client";
import { RoomId } from "../../Const/RoomId";

const socket = io("https://spajam-satori.an.r.appspot.com", {
  transports: ["websocket"],
});

export const JoinRoom = (roomId: RoomId): void => {
  socket.emit("join", roomId);
  return;
};

export const SendCheer = (roomId: RoomId, time: number): void => {
  socket.emit("shake", { room_id: roomId, time: time });
  return;
};
