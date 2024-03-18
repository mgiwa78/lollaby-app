import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import { BaseProps } from "../types/BaseProps";
import { Text } from "@common/Themed";
import Header from "../components/Header";
import axios from "axios";
import { API_URL } from "@constants/Api";
import Item from "../components/item";
import { FlatList } from "react-native-gesture-handler";
import { useGetSoundQuery } from "@toolkit/sound";
import { tracks } from "./player";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSound } from "@redux/slice/soundSlice";
import { selectCurrent } from "@redux/selectors/sound";
import Resource from "../components/Resource";
import { selectUser } from "@redux/selectors/auth";
// import { loginSuccess } from "@/redux/slice/authSlice";

const Sounds = ({ navigation }: BaseProps) => {
  const curentSound = useSelector(selectCurrent);
  const user = useSelector(selectUser);
  const [category, setCategory] = useState(
    `${user?.preference ? user?.preference : ""}`
  );
  const dispatch = useDispatch();

  const setSound = (index: any) => {
    dispatch(setCurrentSound(index));
  };

  return (
    <View style={styles.container}>
      {/* <Header backTo="HomeScreen" title="Found Items" /> */}

      {tracks?.length === 0 && <Text style={styles.headerText}>No Sounds</Text>}
      <View style={styles.categoryTab}>
        {["All", "Engine", "Water", "Lo-Fi"].map((cat, i) => (
          <Pressable
            onPress={() => setCategory(cat)}
            style={[
              styles.category,
              category === cat && {
                backgroundColor: "#fff",
              },
            ]}
            key={i}
          >
            <Text
              style={[
                styles.categoryText,
                category === cat && {
                  color: "#000",
                },
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        style={styles.list}
        scrollEnabled={true}
        data={
          category != "All"
            ? category
              ? tracks.filter((track) => track.category == category)
              : tracks
            : tracks
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Item action={() => setSound(index)} track={item} />
        )}
      />
      <Resource />
    </View>
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
    paddingTop: 20,
    paddingBottom: 0,
    alignItems: "flex-start",
    backgroundColor: "#F7FAFF",
    paddingHorizontal: 9,
  },
  list: {
    height: "40%",
    width: "100%",
  },
  categoryText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "ManropeExtraBold",
  },
  category: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
  categoryTab: {
    gap: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  headerText: {
    fontSize: 18,
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

export default Sounds;
