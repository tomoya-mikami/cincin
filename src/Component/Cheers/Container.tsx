import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Vibration } from "react-native";
import { Accelerometer, ThreeAxisMeasurement } from "expo-sensors";
import { Subscription } from "@unimodules/core";

const UPDATE_MS = 100;
const THRESHOLD = 800;

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [1 * ONE_SECOND_IN_MS];

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
});

const diffMeasurement = (
  before: ThreeAxisMeasurement,
  after: ThreeAxisMeasurement
): number => {
  const beforeValue = round(before.x);
  const afterValue = round(after.x);

  return afterValue - beforeValue;
};

const Container = (): React.ReactElement => {
  const [data, setData] = useState<ThreeAxisMeasurement>({ x: 0, y: 0, z: 0 });
  const [lastThreeAxisMeasurement, setLastThreeAxisMeasurement] = useState<
    ThreeAxisMeasurement
  >({ x: 0, y: 0, z: 0 });
  const [speed, setSpeed] = useState<number>(0);
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );

  useEffect(() => {
    const diff =
      (Math.abs(diffMeasurement(lastThreeAxisMeasurement, data)) / UPDATE_MS) *
      10000;
    setSpeed(diff);
    if (speed > THRESHOLD) {
      Vibration.vibrate(PATTERN);
    }
    setLastThreeAxisMeasurement(data);
  }, [data.x, data.y, data.z]);

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(UPDATE_MS);
    return () => {
      _unsubscribe();
    };
  }, []);

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
    <View style={styles.sensor}>
      <Text style={styles.text}>
        Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
      </Text>
      <Text style={styles.text}>
        x: {round(data.x)} y: {round(data.y)} z: {round(data.z)} speed: {speed}
      </Text>
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
