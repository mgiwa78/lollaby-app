import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { BaseProps } from "../types/BaseProps";
import { Text } from "@common/Themed";
import { tracks } from "../pages/player";
import { useSelector } from "react-redux";
import { selectCurrent } from "@redux/selectors/sound";
// import { loginSuccess } from "@/redux/slice/authSlice";

type PropType = {
  resource: any;
};
const Resource = () => {
  const currentSound = useSelector(selectCurrent);
  const currentTrack = tracks[currentSound];

  return (
    <View style={styles.resource}>
      <Image style={styles.itemImage} source={currentTrack?.artwork} />
      <View style={styles.right}>
        <Text style={styles.count}>{currentTrack.title}</Text>
        <Text style={styles.countText}>{currentTrack.artist}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resource: {
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 38,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    height: 84,
  },
  itemImage: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 2,
  },
  left: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  right: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    gap: 1,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  top: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  bottom: {
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: "ManropeBold",
  },
  title: {
    fontSize: 14,
    fontFamily: "ManropeBold",
  },
  subTitle: {
    fontSize: 14,
    color: "#2B3032",
    fontFamily: "ManropeBold",
  },
  countText: {
    fontSize: 12,
    fontFamily: "ManropeBold",
  },
  count: {
    fontSize: 18,
    fontFamily: "ManropeBold",
  },
  resourceIcon: {
    width: 13.33,
    height: 12,
  },
});

export default Resource;
