import { StyleSheet } from "react-native";

const styles: any = {
  playerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#000"
  },
  video: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#000"
  },
  minSeekBar: {
    height: 2,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FF5E29"
  },
  controls: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  controlsGroup: {
    backgroundColor: "transparent",
    width: 40,
  },
  controlsItemRight: {
    backgroundColor: "transparent",
    width: 40,
  },
  timerText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center"
  },
  seekBar: {
    flex: 1,
    justifyContent: "center",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: "transparent"
  },
  seekTrack: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.5)",
    alignSelf: "stretch"
  },
  seekFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#ff5e29"
  },
  seekHandler: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 20,
    width: 20,
    marginLeft: -10,
    marginBottom: 10,
    position: "absolute",
    transform: [{ scale: 0.8 }],
  },
  btnPlay: {
    borderRadius: 60,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 60,
    height: 60,
    position: "absolute",
    top: "50%",
    left: "50%",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -30 }, { translateX: -30 }]
  }
};

export default styles;