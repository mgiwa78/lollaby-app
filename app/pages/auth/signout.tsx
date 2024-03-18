import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@redux/slice/authSlice";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const SignOut = (props: Props) => {
  const dispatch = useDispatch();

  dispatch(logout());
  const navigation = useNavigation();
  //   navigation.navigate("SignInScreen");
  return (
    <View>
      <Text>SignOut</Text>
    </View>
  );
};

export default SignOut;

const styles = StyleSheet.create({});
