import React from "react";
import { StyleSheet, View, Text } from "react-native";

const App = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Welcome To CinCin! </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
