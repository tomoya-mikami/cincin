import io from "socket.io-client";
import { RoomId, ResponseObj } from "../../Const/RoomId";

const socket = io("localhost://", {
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
  setCheered: React.Dispatch<React.SetStateAction<number>>
): void => {
  socket.on("cheered", (time: number) => {
    setCheered(time);
    return;
  });
};

export const Disconnect = (): void => {
  socket.disconnect();
  return;
};

export const Connect = (): void => {
  socket.connect();
  return;
};
