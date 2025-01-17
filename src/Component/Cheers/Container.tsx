import React, { useState, useEffect } from "react";
import { Text, View, Vibration, TouchableOpacity, Image } from "react-native";
import { Accelerometer, ThreeAxisMeasurement } from "expo-sensors";
import { Subscription } from "@unimodules/core";
import { Audio } from "expo-av";
import { RoomIdLabel } from "../../Const/RoomId";
import { AudioId, AudioPath } from "../../Const/AudioId";
import Styles from "./Style";
import {
  SendCheer,
  SetCheeredListener,
  Disconnect,
  Connect,
} from "../../Model/Cheers/Container";

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

const Container = (props: ContainerProps): React.ReactElement => {
  const [data, setData] = useState<ThreeAxisMeasurement>({ x: 0, y: 0, z: 0 });
  const [receivedCheered, setReceivedCheered] = useState<number>(0);
  const [cheered, setCheered] = useState<number>(0);
  const [lastThreeAxisMeasurement, setLastThreeAxisMeasurement] = useState<
    ThreeAxisMeasurement
  >({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const diffTimeCheck = (timeA: number, timeB: number) => {
    if (timeA === 0 || timeB === 0) {
      return false;
    }
    return Math.abs(timeA - timeB) < 3 * 1000;
  };

  let isFirstAccess = true;
  let overDiff = false;

  // 初期化
  useEffect(() => {
    (async () => {
      if (isFirstAccess) {
        try {
          Connect();
          const soundSetUp = new Audio.Sound();
          await soundSetUp.loadAsync(AudioPath[AudioId.DEFAULT_CIN]);
          setSound(soundSetUp);
        } catch (error) {
          console.log(error);
        }
        _subscribe();
        SetCheeredListener(setReceivedCheered);
        Accelerometer.setUpdateInterval(UPDATE_MS);
        isFirstAccess = false;
      }
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

  // 加速度がしきい値を超えた場合に更新する
  useEffect(() => {
    const diff =
      (Math.abs(diffMeasurement(lastThreeAxisMeasurement, data)) / UPDATE_MS) *
      10000;
    if (diff > THRESHOLD && overDiff === false) {
      overDiff = true;
      const now = Date.now();
      SendCheer(props.roomId, now);
      setCheered(now);
    } else {
      overDiff = false;
    }
    setLastThreeAxisMeasurement(data);
  }, [data.x]);

  // 自分と他人で最後にグラスを降った時刻が近い人がいれば鳴らす
  useEffect(() => {
    if (sound !== undefined) {
      (async () => {
        const soundStatus = await sound.getStatusAsync();
        if (soundStatus.isLoaded && !soundStatus.isPlaying) {
          if (diffTimeCheck(receivedCheered, cheered)) {
            Vibration.vibrate(VIBRATION_DURATION);
            try {
              sound.replayAsync();
            } catch (error) {
              console.log(error);
            }
          }
        }
      })();
    }
  }, [cheered, receivedCheered]);

  const _subscribe = () => {
    const listener = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
    setSubscription(listener);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    return;
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
          onPress={async () => {
            Disconnect();
            await sound?.unloadAsync();
            _unsubscribe();
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
