import React from "react";
import { Button, View, Text } from "react-native";
import { RoomId, RoomIdLabel } from "../../Const/RoomId";

interface ContainerProps {
  joinRoom: (roomId: number) => void;
}

// TODO
// ボタンを押した際にサーバーにルームIDを送る
const Container = (props: ContainerProps): React.ReactElement => {
  return (
    <View>
      <Text>部屋を選んでください</Text>
      <Button
        title={RoomIdLabel[RoomId.KUSATSU]}
        color="#f194ff"
        onPress={() => props.joinRoom(RoomId.KUSATSU)}
      />
      <Button
        title={RoomIdLabel[RoomId.HAKONE]}
        color="#f194ff"
        onPress={() => props.joinRoom(RoomId.HAKONE)}
      />
      <Button
        title={RoomIdLabel[RoomId.AKIU]}
        color="#f194ff"
        onPress={() => props.joinRoom(RoomId.AKIU)}
      />
      <Button
        title={RoomIdLabel[RoomId.ARIMA]}
        color="#f194ff"
        onPress={() => props.joinRoom(RoomId.ARIMA)}
      />
      <Button
        title={RoomIdLabel[RoomId.DOGO]}
        color="#f194ff"
        onPress={() => props.joinRoom(RoomId.DOGO)}
      />
    </View>
  );
};

export default Container;
