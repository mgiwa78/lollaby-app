import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Fonts from "@constants/Fonts";
import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";
import SignUpScreen from "./pages/auth/sign-up";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SignInScreen from "./pages/auth/login";
import HowItWorks from "./pages/how-it-works";
import Sounds from "./pages/sounds";
import Player from "./pages/player";
import SignOut from "./pages/auth/signout";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const RootStack = createStackNavigator();
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const [loaded, error] = useFonts({
    ...Fonts,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {!user && (
          <>
            <Drawer.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{ title: "Sign in" }}
            />
            <Drawer.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ title: "Sign up" }}
            />
          </>
        )}

        <Drawer.Screen
          name="Sounds"
          component={Sounds}
          options={{ title: "Sounds" }}
        />
        <Drawer.Screen
          name="Player"
          component={Player}
          options={{ title: "Player" }}
        />
        <Drawer.Screen
          name="HowItWorks"
          component={HowItWorks}
          options={{ title: "How it works" }}
        />
        {user && (
          <Drawer.Screen
            name="SignOut"
            component={SignOut}
            options={{ title: "Sign Out" }}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
