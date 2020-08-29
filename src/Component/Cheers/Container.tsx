import React, { useState, useEffect } from "react";
import { Text, View, Vibration, TouchableOpacity, Image } from "react-native";
import { Accelerometer, ThreeAxisMeasurement } from "expo-sensors";
import { Subscription } from "@unimodules/core";
import { Audio } from "expo-av";
import { RoomIdLabel, ResponseObj, RoomId } from "../../Const/RoomId";
import { AudioId } from "../../Const/AudioId";
import { AudioPath } from "../../Const/AudioId";
import Styles from "./Style";
import { SendCheer, SetCheeredListener } from "../../Model/Cheers/Container";

const UPDATE_MS = 100;
const THRESHOLD = 10000;
const VIBRATION_DURATION = 300;

// 計算がばいので修正
const diffMeasurement = (
  before: ThreeAxisMeasurement,
  after: ThreeAxisMeasurement
): number => {
  const beforeValue = round(before.x);
  const afterValue = round(after.x);

  return afterValue - beforeValue;
};

interface ContainerProps {
  leaveRoom: () => void;
  roomId: number;
}

// サーバーに接続する
const Container = (props: ContainerProps): React.ReactElement => {
  const [data, setData] = useState<ThreeAxisMeasurement>({ x: 0, y: 0, z: 0 });
  const [cheered, setCheered] = useState<ResponseObj>({
    roomId: RoomId.AKIU,
    time: Date.now(),
  });
  const [lastThreeAxisMeasurement, setLastThreeAxisMeasurement] = useState<
    ThreeAxisMeasurement
  >({ x: 0, y: 0, z: 0 });
  const [speed, setSpeed] = useState<number>(0);
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  const diffTimeCheck = (timeA: number, timeB: number) => {
    return Math.abs(timeA - timeB) < 3 * 1000;
  };

  useEffect(() => {
    (async () => {
      try {
        const soundSetUp = new Audio.Sound();
        await soundSetUp.loadAsync(AudioPath[AudioId.DEFAULT_CIN]);
        setSound(soundSetUp);
      } catch (error) {
        console.log(error);
      }
      _subscribe();
      SetCheeredListener(setCheered);
      Accelerometer.setUpdateInterval(UPDATE_MS);
    })();
    return () => {
      (async () => {
        if (sound !== undefined) {
          await sound.unloadAsync();
        }
        _unsubscribe();
      })();
    };
  }, []);

  useEffect(() => {
    const diff =
      (Math.abs(diffMeasurement(lastThreeAxisMeasurement, data)) / UPDATE_MS) *
      10000;
    setSpeed(diff);
    if (speed > THRESHOLD) {
      if (sound !== undefined) {
        (async () => {
          const soundStatus = await sound.getStatusAsync();
          SendCheer(props.roomId, Date.now());
          if (
            soundStatus.isLoaded &&
            !soundStatus.isPlaying &&
            diffTimeCheck(cheered.time, Date.now())
          ) {
            Vibration.vibrate(VIBRATION_DURATION);
            sound.replayAsync();
          }
        })();
      }
    }
    setLastThreeAxisMeasurement(data);
  }, [data.x, data.y, data.z]);

  const _subscribe = () => {
    const listener = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
    setSubscription(listener);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(subscription);
  };

  return (
    <View style={Styles.container}>
      <Image
        style={Styles.image}
        source={require("../../../assets/splash.png")}
      />
      <Text style={Styles.text}>振って乾杯！</Text>
      <View style={Styles.button}>
        <TouchableOpacity
          onPress={() => {
            props.leaveRoom();
          }}
        >
          <Text style={Styles.buttonText}>{`${
            RoomIdLabel[props.roomId]
          }から出る`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const round = (n: number | null) => {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100);
};

export default Container;
