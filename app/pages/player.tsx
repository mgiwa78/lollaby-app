import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { BaseProps } from "../types/BaseProps";
import Header from "../components/Header";
import { Audio } from "expo-av";
import { useGetSoundQuery } from "@toolkit/sound";
import PlayerItem from "../components/player-item";
import { Sound } from "expo-av/build/Audio";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSound } from "@redux/slice/soundSlice";
import { selectCurrent } from "@redux/selectors/sound";
import { Text } from "@common/Themed";
// import { loginSuccess } from "@/redux/slice/authSlice";

export const tracks = [
  {
    url: require("../assets/sounds/barradeen-bedtime-after-a-coffee(chosic.com).mp3"),
    title: "Coelacanth I",
    artist: "deadmau5",
    category: "Engine",
    artwork: require("../assets/cover/22.png"),
    duration: 166,
  },
  {
    url: require("../assets/sounds/Colorful-Flowers(chosic.com).mp3"),
    title: "Ice Age",
    artist: "deadmau5",
    category: "Water",
    artwork: require("../assets/cover/33.png"),
    duration: 411,
  },
  {
    url: require("../assets/sounds/Luke-Bergs-Island(chosic.com).mp3"),
    title: "Ice Age",
    artist: "deadmau5",
    category: "Engine",
    artwork: require("../assets/cover/44.png"),
    duration: 411,
  },
  {
    url: require("../assets/sounds/Kugelblitz-chosic.com_.mp3"),
    title: "Ice Age",
    artist: "deadmau5",
    category: "Lo-Fi",
    artwork: require("../assets/cover/55.png"),
    duration: 411,
  },
  {
    url: require("../assets/sounds/Sakura-Girl-City-Walk-chosic.com_.mp3"),
    title: "City Walk",
    artist: "Sakura Girl",
    category: "Lo-Fi",
    artwork: require("../assets/cover/66.png"),
    duration: 411,
  },
];

const times = [
  {
    label: "5 Minutes",
    time: 300000,
  },
  {
    label: "10 Minutes",
    time: 600000,
  },
  {
    label: "15 Minutes",
    time: 900000,
  },
  {
    label: "30 Minutes",
    time: 1800000,
  },
  {
    label: "1 Hour",
    time: 3600000,
  },
];
const Player = () => {
  const [sound, setSound] = useState<Sound>();
  const [openTimer, setOpenTimer] = useState<boolean>(false);
  const [timer, setTimer] = useState<{ label: string; time: number }>();

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        console.log("pausing");
        sound?.pauseAsync();
      }, Number(timer.time));
    }
  }, [timer]);

  const dispatch = useDispatch();
  const currentSound = useSelector(selectCurrent);

  const moveUp = async () => {
    const newIndex = (currentSound + 1) % tracks.length;
    dispatch(setCurrentSound(newIndex));
    await playSound();
  };

  const moveDown = async () => {
    const newIndex = currentSound - 1;
    if (newIndex < 0) {
      dispatch(setCurrentSound(tracks.length));
    } else {
      dispatch(setCurrentSound(newIndex));
    }

    await playSound();
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(tracks[currentSound].url);
    await Audio.setAudioModeAsync({ staysActiveInBackground: true });
    setSound(sound);

    await sound.playAsync();
    sound?.setIsLoopingAsync(true);
  }

  const playerStatus = async () => {
    console.log(sound?.getStatusAsync());
  };

  const pauseSound = async () => {
    await sound?.pauseAsync();
    playerStatus();
  };

  const play = async () => {
    await sound?.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    console.log(currentSound);
    const init = async () => {
      await playSound();
    };

    init();
  }, [currentSound]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Header backTo="" title="Now playing" />
          <View style={styles.body}>
            <PlayerItem track={tracks[currentSound]} />

            {/* <PlayerItem type={"current"} />
          <PlayerItem /> */}
          </View>
          <View style={styles.track}>
            <Pressable onPress={() => moveDown()}>
              <Image
                style={styles.headerBtn}
                source={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHNSURBVHgB7dmBTcMwEAXQLxaAETwCI3gENsAb0A2SDWCDsgEjdARGyAgZodhKraZRuCT2XZ2k96STEEjc5deOowZQSimllFJKKaVSvPtqfTWXn6VZXydf50vPCoU1l2FCtZBjfB17vfp1QEHDYbi9oPuUW4xfvHTwkyQDsLhdYVQVIzHIK677fKzG/lYM5yBhuX+CXuoHgb5ZuAb5AL3Pv9AFxN03W+4g1tcv6OVuBPqySR3EgN7nDbpwuPuyWzrI1LEWfl/jdrlz9BWzZBAH+lg7YvrCU/qKmjOIxfSxZsHf9y6oQcKneQR9rDmkWX0AFfL3eUrfuxsOYkHv8xPGj7XcvsWcZ1Y46y34bCaA/uOrZN9iqIsfPr5K9k3yBFnPkAtgNaa2QIP0o25J32Lm3gRDEG/gs9oAHKYfdw3yrTaAqAYdRIWdPgj1GV/fkLk/bCKAyIBeDQ2Wb4tNBRA58N0fNhlAEPZ9DXo1VDP+z2YDiAzy7g+bDyAKzwYp22I3AUQOdBDhfYER6JuNcxCD+dtilwFExtcP6CB2HUDk8KAvR4dq0K/NGhTU3mkQg//vDzUKcuguPOcr7iUMru8YpL5uU0oppZRSSim1a3+vWfacBDXR1AAAAABJRU5ErkJggg==",
                }}
              />
            </Pressable>
            <Pressable onPress={() => pauseSound()}>
              <Image
                style={styles.headerBtn}
                source={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACaSURBVHgB7dCxDQIxEAXRARqiI+qgSzqAlOjo4DCSAxIkW8Z3wZ8nrbTJytaAJEmSJEn/dCmzlLnXfev73X0+vtZZ6Dd63+TAPOvgW6P3TY6EMwDhDEA4AxDOAIQzAOEMQDgDEM4AhDMA4QxAOAMQzgCEMwDhDEA4AxBuZoDX1/6g3+h9kxPzPMuc634tc6PP6L0kSZIkST+8AZllF1kbEyX9AAAAAElFTkSuQmCC",
                }}
              />
            </Pressable>
            <Pressable onPress={() => play()}>
              <Image
                style={[styles.headerBtn]}
                source={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGVSURBVHgB7dlvbcMwEAXwpyEYBEMYhEAYhDDYGCQMNgYdg0EIhEEIhI5B5lNlrarsyz9H8jnvJ92XfvPrnX1qASIiIiIiIqKt3nxdfU2+Bl8OJ9LhdvDHuuAkQYyIByAlXdGhctOCkpBaVCp22FQQ36hwLB4PKVroQVR1P8QCEM7XJ04wFqkAAufrC3oQrzBsLoCgRaVjsTSAoIceROfrGYasDUA4zI9FCyO2BBA46N0wwsBY7AkgaGH4fsgRgJC576F3Q4cC5QogcDB2P+QOIJDdYG4singtjgogaJEO4oICHB2AcIiPxRU7PcGGX2Q47FGO7oD7n9tONQKNrx+kL8EBlV6CDrfDac9gg4LkXIQ6pNtdPu9RoFyrcOrgRb35MXsCaKC3+4DC2j1mSwDybV5gaN3VrAlg6ZxX+YNIA323l3Z3MGguAAd9zuWtb2BYKgBp4w+kDy7t/o4KxALQ1lcp+b/A1JxrYrOszfkLKjMtqBHG51yjtbrJZ20tuchS66vDSfT4f+NlzhsQERERERERFesPKrh27AEiJwQAAAAASUVORK5CYII=",
                }}
              />
            </Pressable>
            <Pressable onPress={() => moveUp()}>
              <Image
                style={styles.headerBtn}
                source={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHESURBVHgB7ZqBbcIwEEW/OkFH8AgdwSN0g3qDdoNkg3aDdIOOwAgdISPQDahPJGpEyeEkNjbmP+kkhBD/8rkfGwNACCGEEEIIIYSs5dXX3tfB186XQXpeBs1+eJyNBscLP60OaY3oJ1p7ZGTayGlJYw3ScKqVjUNAiUkOcSnWAG0ivhAvFsUaIDjoRnTYbkTRBgjG1wfSxaJ4A0aMr0/oRjwjvu7VCG3EIW4sbs6AkRa6EY2vx4D3uVkDBIPLsXCIr5uELY0Y6NPQYz4WVRgw4rD8/lCVAYLkvoU+DU0C3c3EbsQg7P5QrQEjsjfQYlG9ASMOYUZk4xqNGOixWK37gNvgB5kPPTRST8D0uO2uImB9feMOb4IGx4NVbRm0qHQj1GB+3OX5NoHuZmI04qDnvMP/b4hVGGChj/tueE1s3aisaUQ+zQ56zh3i6yZhSSOhOa/yQMRC39LuUOmRmIGec1nrLeLrXo25RmSM3zF/4TLub1hP0QZc2r7K7wUhOV+qm4VzWdZy/oQ4FGvA3LJmEZdiDNBGfcmytpRiDHjD+YvvkPYPElPje2Smxd8aLzm3SI8bNPeI/98DQgghhBBCCCFV8wv/Gfh6LX0bhgAAAABJRU5ErkJggg==",
                }}
              />
            </Pressable>
          </View>
          <View style={styles.timer}>
            <View
              onTouchEnd={() => setOpenTimer(!openTimer)}
              style={styles.timerHeader}
            >
              <Text style={styles.timerHeaderText}> Set Timer</Text>
              {!openTimer && (
                <Image
                  style={styles.timerHeaderIcon}
                  source={{
                    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADxSURBVHgB7dlRioNAFETR2unUzrMElzATmRSEYEhi1H5t3wMN/ih961cJAAAAAAAAiJ/rma7ncnvuzdf3n1/8vTs9jTDf9f7uk1aYHj7SywiP8fO5aAUvfKj6CEvx87FWsvoZYfP4sOqPsFt8WHVH2D0+rHojHBYfVp0RDo8Pq/0IzeLDajdC8/iwjh+hTHxYx41QLj6s/UcoGx/WfiOUjw9r+xG6iQ9ruxG6iw/r+xG6jQ9r/Qjdx4f1+QiniQ/r/RFOFx/W6xFOGx/W8xFOHx/WcugQ8WENHB/WwPFhDRwf1v8Pi0kDxgMAAAAAAKCVP6bqHrSAE48gAAAAAElFTkSuQmCC",
                  }}
                />
              )}
              {openTimer && (
                <Image
                  style={styles.timerHeaderIcon}
                  source={{
                    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADqSURBVHgB7dBdboMwFETh2Wln5yyBJbSpxDz0J1FCsPE155OuxAuSz0gAAAAAAABALx+3W2+3bN+X8h38+esuM8J/8ZcZ4VH89CM8Ez/tCPfivd3UIzyKD2vSEZ6JD2uyEV6JD2uSEfbEh1V8hHfiwyo6whHxYRUb4cj4sIqM0CI+rMFHaBkf1qAj9IgPa7AResaHNcgIZ8SHdfIIZ8aHddIII8SH1XmEkeLD6jTCiPFhNR5h5PiwGo1QIT6sg0eoFB/WgSMsqhUf1t93r9phVb34sH6+fdEO3n5cVSs+rNrvBwAAAAAAQBNfQ6QeskwdHh0AAAAASUVORK5CYII=",
                  }}
                />
              )}
            </View>

            {openTimer && (
              <View style={styles.timerBody}>
                {times.map((t, i) => (
                  <Pressable style={styles.time} onPress={() => setTimer(t)}>
                    <Text style={styles.timeText}>{t.label}</Text>
                    <Text
                      style={[
                        styles.timeSelected,
                        timer?.time === t.time && { backgroundColor: "#000" },
                      ]}
                    ></Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    overflow: "hidden",
    gap: 10,
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: 20,

    alignItems: "flex-start",
    backgroundColor: "#F7FAFF",
    paddingHorizontal: 9,
  },
  headerBtn: {
    width: 40,
    height: 40,
  },
  timerHeaderIcon: {
    width: 30,
    height: 18,
  },
  body: {
    flexDirection: "row",
    position: "relative",
    gap: 25,
    transform: [
      {
        translateX: -0,
      },
    ],
    width: "100%",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#F7FAFF",
    paddingHorizontal: 9,
  },

  track: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  timer: {
    marginTop: 20,
    flexDirection: "column",
    display: "flex",
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  timerHeader: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerHeaderText: {
    fontSize: 18,
    fontFamily: "ManropeExtraBold",
  },
  timerBody: {
    flexDirection: "column",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  timeSelected: {
    backgroundColor: "#fff",
    borderRadius: 100,
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  time: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    height: 50,
    flexDirection: "row",
    width: "100%",
  },
  timeText: {
    fontSize: 16,
    fontFamily: "ManropeRegular",
  },
  header: {
    justifyContent: "center",
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

export default Player;
