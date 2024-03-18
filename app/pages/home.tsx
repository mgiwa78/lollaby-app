import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { BaseProps } from "../types/BaseProps";
import { Text } from "@common/Themed";
import Menu from "../components/Menu";
import { useAppDispatch } from "@redux/hooks";
// import { loginSuccess } from "@/redux/slice/authSlice";

const HomeScreen = ({ navigation }: BaseProps) => {
  const dispatch = useAppDispatch();
  //   dispatch(logout());
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Home</Text>
          <Pressable style={styles.searchBtn}>
            <Image
              style={styles.searchIcon}
              source={{
                uri: "data:image/png;base64,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",
              }}
            />
          </Pressable>
        </View>
        <Menu />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    position: "relative",
    gap: 10,
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: 50,
    alignItems: "center",
    backgroundColor: "#F6FAFC",
    paddingHorizontal: 15,
    paddingBottom: 110,
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "ManropeExtraBold",
  },
  searchBtn: {
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 15.67,
    height: 15.9,
  },
});

export default HomeScreen;
