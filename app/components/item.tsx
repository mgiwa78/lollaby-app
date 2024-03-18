import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { soundImage1 } from "../assets/image/images";
import { BaseProps } from "../types/BaseProps";
import { Text } from "@common/Themed";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { Sound } from "../types/Sound";
import { formateDate } from "../utils/formatDate";
// import { loginSuccess } from "@/redux/slice/authSlice";

type PropType = {
  backTo: string;
  title: string;
  item: Sound;
};

const Item = ({ track, action }: any) => {
  return (
    <Pressable onPress={() => action()} style={styles.item}>
      <Image style={styles.itemImage} source={track?.artwork} />
      <View style={styles.bottom}>
        <Text style={styles.itemName}>{track?.title}</Text>
        <Text style={styles.itemArtist}>{track?.artist}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    borderRadius: 10,
    width: 180,
    marginHorizontal: 3,
    textAlign: "center",
    marginBottom: 15,
  },
  itemText: {
    fontSize: 24,
    fontFamily: "ManropeExtraBold",
  },
  itemType: {
    fontSize: 16,
    fontFamily: "ManropeMedium",
  },
  itemArtist: {
    fontSize: 12,
    fontFamily: "ManropeRegular",
  },
  itemName: {
    fontSize: 17,
    fontFamily: "ManropeBold",
    textTransform: "capitalize",
  },
  bottom: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  top: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  itemImage: {
    width: 180,
    height: 180,
    backgroundColor: "#000",
    borderRadius: 8,
  },
});

export default Item;
