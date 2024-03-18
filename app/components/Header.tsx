import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { BaseProps } from "../types/BaseProps";
import { Text } from "@common/Themed";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
// import { loginSuccess } from "@/redux/slice/authSlice";

type PropType = {
  backTo: string;
  title: string;
};
const Header = ({ backTo, title }: BaseProps & PropType) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.header}>
      {backTo && (
        <Pressable onPress={() => navigation.navigate(backTo)}>
          <Image
            style={styles.headerBtn}
            source={{
              uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJNSURBVHgB7dzNUeNAEEDhlncDIIQ9bu1JhEAGmwIZQCSEQAoQAWSAThRHQnAAoEHDT1Fg8HSPekZi6n1VHCjf+tkg260RAQAAAAAAAAAAAFrWyQr97fs/v6Q776Trg8jB9HMxynh6Nwz30pjVBfjX9/1GNldx8J8e2j7KeNhahI2syJ7hRwfxVSGNWU2AxPBfdb00ZhUBdMN/lnr8x1k8gGH4EiRcSmMWDWAZfidhO0o4kcYsFiBj+EdchjrJGf7tMAzSoOoBGP5HVQMw/F3VAjD8r1UJwPC/VzwAw9+vaACGn1YsAMPXKRKA4eu5B2D4Nq4BGL6dWwCGn8clAMPPNzsAw59nVgCGP192AIbvIysAw/djDsDwfZkCMHx/6gAMvwxVAMvwEddn9LusyQBxUfa3bG4YvplqlzW5ljI9888YfhbVLmsywPQS+S/IlN5l1SxmbQW5kn85FAECVzKZNLusyQCPEo6FV4GZdpc1GSD+Fw8yHgkRVOLgp+f+9YOEQ5fL0DfxvUA3vRcQ3RXRNkbjjVia+aMIIvjK+jCOCH6yP44mgo9ZX8gQYb7ZX0kSYR6XL+WJkM9tLYUIeVwXs4hg576aSASbIsu5RNArtp5OBJ2iN2gQIa34LUpE2K/KTXpE+F6121SJ8LWqN2oTYVf1owqI8NEih3UQ4d1ix9UQ4cVix1YS4cWi54ZaI3BuqLP4jDasvHBuaAm2CJwbWoQhQnNb2qs5OVcTgXNDC9sXgXNDK4kR4tXOdHl2EX+37loCAAAAAAAAAIAdTx8OFJFcpkuHAAAAAElFTkSuQmCC",
            }}
          />
        </Pressable>
      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F7FAFF",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "ManropeSemiBold",
  },
  headerBtn: {
    width: 24,

    height: 24,
  },
});

export default Header;
