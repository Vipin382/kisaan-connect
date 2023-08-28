import React from "react";
import { View, Text, Pressable, ToastAndroid } from "react-native";
import { RootStackParamList } from "./HomeScreen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";

const TehseelScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Teshsildar", "Home">) => {
  return (
    <View className="h-full flex bg-white items-center justify-center">
      <View className="h-[90%] pt-10 w-[90%] flex items-center gap-y-4">
        <View className="h-[40%] w-full">
          <Image
            source={require("../../assets/sorry.jpg")}
            className=" h-full w-[90%]"
            contentFit={"contain"}
            contentPosition={"top center"}
          />
        </View>
        <Text className="text-justify text-xs w-[80%] text-neutral-400 font-mediym">
          The information you provided is not sufficient to authenticate your
          land.Click below to apply for Tehsildar verification.
        </Text>
        <Pressable
          className={
            " w-full rounded-md bg-blue-950  h-12 flex justify-center items-center"
          }
          onPress={() => {
            ToastAndroid.show("Verification Email sent", ToastAndroid.LONG);
            setTimeout(() => navigation.navigate("Home"), 2000);
          }}
        >
          <Text className="text-white px-4 font-bold text-xs py-1">
            Sent Verification
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TehseelScreen;
