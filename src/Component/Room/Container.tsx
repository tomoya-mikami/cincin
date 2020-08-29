import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RoomId, RoomIdLabel } from "../../Const/RoomId";
import Styles from "./Style";

interface ContainerProps {
  joinRoom: (roomId: RoomId) => void;
}

const Container = (props: ContainerProps): React.ReactElement => {
  return (
    <View style={Styles.container}>
      <View style={Styles.buttonContainer}>
        <Text style={Styles.HeadingText}>グループを選択</Text>
        <View style={Styles.button}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.KUSATSU)}>
            <Text style={Styles.buttonText}>{RoomIdLabel[RoomId.KUSATSU]}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.button}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.HAKONE)}>
            <Text style={Styles.buttonText}>{RoomIdLabel[RoomId.HAKONE]}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.button}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.AKIU)}>
            <Text style={Styles.buttonText}>{RoomIdLabel[RoomId.AKIU]}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.button}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.ARIMA)}>
            <Text style={Styles.buttonText}>{RoomIdLabel[RoomId.ARIMA]}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.button}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.DOGO)}>
            <Text style={Styles.buttonText}>{RoomIdLabel[RoomId.DOGO]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Container;
