import React from "react";
import { StyleSheet, View } from "react-native";
import Cheers from "./Cheers/Container";
import Room from "./Room/Container";

const App = (): React.ReactElement => {
  const [roomId, setRoomId] = React.useState<number>(0);
  const joinRoom = (roomId: number) => {
    setRoomId(roomId);
  };
  const leaveRoom = () => {
    setRoomId(0);
  };

  return (
    <View style={styles.container}>
      {roomId === 0 ? (
        <Room joinRoom={joinRoom} />
      ) : (
        <Cheers roomId={roomId} leaveRoom={leaveRoom} />
      )}
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
