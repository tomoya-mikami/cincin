export type ResponseObj = {
  roomId: RoomId;
  time: number;
};

export enum RoomId {
  NO_ROOM = 0,
  KUSATSU = 1, // 草津結衣奈
  HAKONE = 2, // 箱根彩耶
  AKIU = 3, // 秋保那菜子
  ARIMA = 4, // 有馬輪花
  DOGO = 5, // 道後泉海
}

export const RoomIdLabel: { [key: number]: string } = {};
RoomIdLabel[RoomId.NO_ROOM] = "部屋に入っていません";
RoomIdLabel[RoomId.KUSATSU] = "草津";
RoomIdLabel[RoomId.HAKONE] = "箱根";
RoomIdLabel[RoomId.AKIU] = "秋保";
RoomIdLabel[RoomId.ARIMA] = "有馬";
RoomIdLabel[RoomId.DOGO] = "道後";
