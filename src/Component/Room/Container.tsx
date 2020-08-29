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
        <View style={Styles.buttonKusatsu}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.KUSATSU)}>
            <Text style={Styles.buttonTextKusatsu}>
              {RoomIdLabel[RoomId.KUSATSU]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.buttonHakone}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.HAKONE)}>
            <Text style={Styles.buttonTextHakone}>
              {RoomIdLabel[RoomId.HAKONE]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.buttonAkiu}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.AKIU)}>
            <Text style={Styles.buttonTextAkiu}>
              {RoomIdLabel[RoomId.AKIU]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.buttonArima}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.ARIMA)}>
            <Text style={Styles.buttonTextArima}>
              {RoomIdLabel[RoomId.ARIMA]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.buttonDogo}>
          <TouchableOpacity onPress={() => props.joinRoom(RoomId.DOGO)}>
            <Text style={Styles.buttonTextDogo}>
              {RoomIdLabel[RoomId.DOGO]}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Container;
