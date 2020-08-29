import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B7A75",
  },
  image: {
    width: 420,
    height: 420,
  },
  button: {
    margin: 4,
    height: 48,
    borderWidth: 0.8,
    borderRadius: 4,
    borderColor: "#fff",
  },
  text: {
    margin: 12,
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 48,
    textAlign: "center",
  },
});

export default Styles;
