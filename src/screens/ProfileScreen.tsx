/// <reference types="nativewind/types" />
import React, { useState } from "react";
import { Image } from "expo-image";
import { View, Text, TextInput, Pressable, ToastAndroid } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLandVerification } from "../context/UserDataWrapper";
import { RootStackParamList } from "./HomeScreen";

const ProfileScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Profile">) => {
  const [ULPIN, SetULPIN] = useState("");
  const { aadhaarNumber } = useLandVerification();
  const Api = async (UL_PIN: string) => {
    try {
      const response = await fetch("http://192.168.121.7:8000/verifyPin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          num: UL_PIN,
          aadhaar: aadhaarNumber,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result === false) {
          ToastAndroid.show("User not exist", ToastAndroid.SHORT);
        } else {
          if (result === "Approved") {
            ToastAndroid.show(`Documents are ${result}`, ToastAndroid.SHORT);
            navigation.navigate("Verified");
          } else if (result === "Doubtful") {
            ToastAndroid.show(`Documents are ${result}`, ToastAndroid.SHORT);
            navigation.navigate("Teshsildar");
          } else {
            ToastAndroid.show(`Documents are ${result}`, ToastAndroid.LONG);
            setTimeout(() => navigation.navigate("Home"), 5000);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const HandleULPIN = () => {
    if (ULPIN && ULPIN.length === 14) {
      Api(ULPIN);
    } else {
      (ULPIN.length < 14 && ULPIN.length > 0) || ULPIN.length > 14
        ? ToastAndroid.show("Pin should be of length 14", ToastAndroid.SHORT)
        : ToastAndroid.show("Enter ULPIN", ToastAndroid.SHORT);
    }
  };
  return (
    <View className="h-full flex justify-center py-4 items-center">
      <View className="flex-[1] w-[90%]">
        <Image
          source={require("../../assets/digital.png")}
          className=" h-full w-[90%]"
          contentFit={"contain"}
          contentPosition={"top center"}
        />
      </View>
      <View className="w-[90%] flex-1 gap-y-4">
        <View className="flex gap-y-4">
          <Text className="font-medium text-xs text-start w-full">
            Enter Your ULPIN
          </Text>
          <TextInput
            value={ULPIN.toString()}
            placeholder="ULPIN"
            keyboardType={"twitter"}
            placeholderTextColor={"#d1d4d8"}
            className="border w-full p-3 rounded-lg bg-neutral-100 border-neutral-200 "
            onChangeText={(e) => SetULPIN(e)}
          />
        </View>
        <Pressable
          className={
            " w-full rounded-md bg-blue-950  h-12 flex justify-center items-center"
          }
          onPress={() => HandleULPIN()}
        >
          <Text className="text-white px-4 font-bold text-xs py-1">Verify</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
