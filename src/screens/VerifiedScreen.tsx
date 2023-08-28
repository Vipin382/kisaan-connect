import React from "react";
import { View, Text, Pressable, ToastAndroid } from "react-native";
import { RootStackParamList } from "./HomeScreen";
import { Image } from "expo-image";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLandVerification } from "../context/UserDataWrapper";
type Props = {};

const VerifiedScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Verified">) => {
  const { setUserOtp, setAadhaarNumber } = useLandVerification();
  setTimeout(() => navigation.navigate("Home"), 5000);
  return (
    <View className="h-full flex items-center justify-center bg-white">
      <View className="h-full w-[90%] gap-y-10 flex items-center justify-center">
        <View className="h-[20%] w-full">
          <Image
            source={require("../../assets/verify.gif")}
            className=" h-full w-[90%]"
            contentFit={"contain"}
            contentPosition={"top center"}
          />
        </View>
        <Text className=" font-bold w-[80%] text-center text-xs py-1">
          ✔ Congratulation you are verified. Our Officials will connect with you
          sortly.
        </Text>
      </View>
    </View>
  );
};

export default VerifiedScreen;
