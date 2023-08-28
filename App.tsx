import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, View } from "react-native";
import UserDataWrapper from "./src/context/UserDataWrapper";
import TehseelScreen from "./src/screens/TehseelScreen";
import VerifiedScreen from "./src/screens/VerifiedScreen";

export type HomeStackNavigatorParamList = {
  Home: undefined;
  Profile: undefined;
  Teshsildar: undefined;
  Verified: undefined;
};

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function App() {
  return (
    <UserDataWrapper>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Teshsildar" component={TehseelScreen} />
          <Stack.Screen name="Verified" component={VerifiedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserDataWrapper>
  );
}
