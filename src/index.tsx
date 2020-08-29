import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Accelerometer from "./Component/Accelerometer/Container";

const App = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Accelerometer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
