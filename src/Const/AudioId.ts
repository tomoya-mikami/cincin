import { AVPlaybackSource } from "expo-av/build/AV";

export enum AudioId {
  DEFAULT_CIN = 0,
}

export const AudioPath: { [key: number]: AVPlaybackSource } = {};
AudioPath[AudioId.DEFAULT_CIN] = require("../../assets/cin.wav");
