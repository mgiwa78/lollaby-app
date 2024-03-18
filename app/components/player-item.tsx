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
const PlayerItem = ({ type, track }: any) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View
      style={[
        styles.item,
        type === "current" ? { width: 261 } : { width: 229.43 },
      ]}
    >
      <Image
        style={[
          styles.itemImage,
          type === "current"
            ? { width: 261, height: 261 }
            : { width: 229.43, height: 229.43 },
        ]}
        source={track.artwork}
      />
      {type === "current" && (
        <View style={styles.bottom}>
          <Text style={styles.itemName}>Monsters Go Bump</Text>
          <Text style={styles.itemArtist}>ERIKA RECINOS</Text>
        </View>
      )}
    </View>
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
    width: 261,
    borderWidth: 1,
    borderColor: "#000",
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
    width: 261,
    height: 261,
    backgroundColor: "#000",
    borderRadius: 8,
  },
});

export default PlayerItem;
