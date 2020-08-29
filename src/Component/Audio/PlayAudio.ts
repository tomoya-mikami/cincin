import { Audio } from "expo-av";
import { AudioPath } from "../../Const/AudioId";

const PlayAudio = async (audioId: number) => {
  const sound = new Audio.Sound();

  try {
    await sound.loadAsync(AudioPath[audioId]);
    await sound.playAsync();
    await sound.unloadAsync();
    console.log("Audio");
  } catch (err) {
    console.log(err);
  }
};

export default PlayAudio;
