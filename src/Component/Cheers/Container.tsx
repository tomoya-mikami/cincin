import React, { useState, useEffect } from "react";
import { Text, View, Vibration, Button } from "react-native";
import { Accelerometer, ThreeAxisMeasurement } from "expo-sensors";
import { Subscription } from "@unimodules/core";
import { Audio } from "expo-av";
import { RoomIdLabel } from "../../Const/RoomId";
import { AudioId } from "../../Const/AudioId";
import { AudioPath } from "../../Const/AudioId";
import Styles from "./Style";

const UPDATE_MS = 100;
const THRESHOLD = 800;

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [1 * ONE_SECOND_IN_MS];

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
  const [lastThreeAxisMeasurement, setLastThreeAxisMeasurement] = useState<
    ThreeAxisMeasurement
  >({ x: 0, y: 0, z: 0 });
  const [speed, setSpeed] = useState<number>(0);
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

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
      Vibration.vibrate(PATTERN);
      if (sound !== undefined) {
        sound.replayAsync();
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
    <View style={Styles.sensor}>
      <Text style={Styles.text}>
        Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
      </Text>
      <Text style={Styles.text}>
        x: {round(data.x)} y: {round(data.y)} z: {round(data.z)} speed: {speed}
      </Text>
      <Button
        title={RoomIdLabel[props.roomId] + "から出る"}
        onPress={() => props.leaveRoom()}
        color="#f194ff"
      />
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
