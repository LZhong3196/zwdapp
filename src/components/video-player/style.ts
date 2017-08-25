import { StyleSheet } from "react-native";

const styles: any = {
  playerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
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
  controlsItemLeft: {
    marginRight: 10,
    backgroundColor: "transparent"
  },
  controlsItemRight: {
    marginLeft: 10,
    backgroundColor: "transparent",
    width: 50,
    justifyContent: "center"
  },
  timerText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center"
  },
  seekBar: {
    flex: 1,
    justifyContent: "center",
  },
  seekTrack: {
    width: "100%",
    height: 2,
    backgroundColor: "rgba(255,255,255,0.5)",
    overflow: "hidden"
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
    height: 16,
    width: 16,
    marginLeft: -8,
    marginBottom: 8,
    position: "absolute",
    transform: [{ scale: 0.8 }]
  }
};

export default styles;