/// <reference types="nativewind/types" />
import React, { useEffect, useState } from "react";
import { TextInput, Text, ToastAndroid, View, Pressable } from "react-native";
import { Image } from "expo-image";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLandVerification } from "../context/UserDataWrapper";

interface ListData {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Teshsildar: undefined;
  Verified: undefined;
};
const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home", "Profile">) => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [num5, setNum5] = useState("");
  const [num6, setNum6] = useState("");
  const [num7, setNum7] = useState("");
  const [num8, setNum8] = useState("");
  const [num9, setNum9] = useState("");
  const [num10, setNum10] = useState("");
  const [num11, setNum11] = useState("");
  const [num12, setNum12] = useState("");
  const [verified, setverified] = useState<boolean>(false);

  //otp usestate
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  const { aadhaarNumber, setAadhaarNumber, setUserOtp, userOtp } =
    useLandVerification();

  const Api = async (aadhaar_num: string) => {
    try {
      const response = await fetch("http://192.168.121.7:8000/verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          aadhaar: aadhaar_num,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setAadhaarNumber(aadhaar_num);
        setUserOtp(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (verified) {
      setTimeout(() => setverified(false), 120000);
    }
  }, [verified]);

  const VerifyOtp = () => {
    if (otp1 && otp2 && otp3 && otp4) {
      if (`${otp1}${otp2}${otp3}${otp4}` === userOtp) {
        ToastAndroid.show("Aadhaar Card Verified", ToastAndroid.SHORT);
        setOtp1("");
        setOtp2("");
        setOtp3("");
        setOtp4("");
        navigation.navigate("Profile");
      } else {
        ToastAndroid.show("You are not Verified user", ToastAndroid.SHORT);
        setOtp1("");
        setOtp2("");
        setOtp3("");
        setOtp4("");
      }
    }
  };

  const HandleVerify = () => {
    if (
      num1 &&
      num2 &&
      num3 &&
      num4 &&
      num5 &&
      num6 &&
      num7 &&
      num8 &&
      num9 &&
      num10 &&
      num11 &&
      num12
    ) {
      Api(
        `${num1}${num2}${num3}${num4}${num5}${num6}${num7}${num8}${num9}${num10}${num11}${num12}`
      );
      ToastAndroid.show("Enter OTP sent", ToastAndroid.SHORT);
      setverified(true);
      setNum1("");
      setNum2("");
      setNum3("");
      setNum4("");
      setNum5("");
      setNum6("");
      setNum7("");
      setNum8("");
      setNum9("");
      setNum10("");
      setNum11("");
      setNum12("");
      // navigation.navigate("Profile");
    } else {
      ToastAndroid.show("fill all field!", ToastAndroid.SHORT);
    }
  };
  return (
    <View className="h-full  bg-white flex justify-around space-y-2 gap-y-3 items-center">
      <View className="h-[40%] w-full">
        <Image
          source={require("../../assets/auth.jpg")}
          className=" h-full w-[90%]"
          contentFit={"contain"}
          contentPosition={"top center"}
        />
      </View>
      <View className="flex flex-col space-y-3 w-[90%] items-center ">
        <Text className="text-2xl capitalize font-medium tracking-wider">
          Aadhaar Verification
        </Text>
        <Text className="text-sm font-medium">Welcome </Text>
        <Text className="text-neutral-400 text-center text-xs">
          {verified
            ? ` Thanks you for using our app. Please type the OTP as shared on your mobile`
            : "Thanks you for using our app. Please enter Aadhaar card number"}
        </Text>
      </View>
      {verified ? (
        <View className="flex space-x-1 flex-row">
          <TextInput
            maxLength={1}
            value={otp1?.toString()}
            onChangeText={(value) => setOtp1(value)}
            className="border rounded text-center flex justify-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            maxLength={1}
            value={otp2}
            onChangeText={(value) => setOtp2(value)}
            className="border rounded flex text-center justify-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            value={otp3?.toString()}
            onChangeText={(value) => setOtp3(value)}
            maxLength={1}
            className="border rounded flex text-center justify-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            value={otp4?.toString()}
            onChangeText={(value) => setOtp4(value)}
            maxLength={1}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
        </View>
      ) : (
        <View className="flex space-x-1 flex-row">
          <TextInput
            maxLength={1}
            value={num1?.toString()}
            onChangeText={(value) => setNum1(value)}
            className="border rounded text-center flex justify-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            maxLength={1}
            value={num2}
            onChangeText={(value) => setNum2(value)}
            className="border rounded flex text-center justify-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            value={num3?.toString()}
            onChangeText={(value) => setNum3(value)}
            maxLength={1}
            className="border rounded flex text-center justify-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            value={num4?.toString()}
            onChangeText={(value) => setNum4(value)}
            maxLength={1}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            value={num5?.toString()}
            onChangeText={(value) => setNum5(value)}
            maxLength={1}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            value={num6?.toString()}
            onChangeText={(value) => setNum6(value)}
            maxLength={1}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            maxLength={1}
            value={num7?.toString()}
            onChangeText={(value) => setNum7(value)}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            maxLength={1}
            value={num8?.toString()}
            onChangeText={(value) => setNum8(value)}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            maxLength={1}
            value={num9?.toString()}
            onChangeText={(value) => setNum9(value)}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            maxLength={1}
            value={num10?.toString()}
            onChangeText={(value) => setNum10(value)}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            maxLength={1}
            value={num11?.toString()}
            onChangeText={(value) => setNum11(value)}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
          <TextInput
            maxLength={1}
            value={num12?.toString()}
            onChangeText={(value) => setNum12(value)}
            className="border rounded flex justify-center text-center items-center border-neutral-300"
            keyboardType={"number-pad"}
          />
        </View>
      )}
      <Pressable
        className={
          "bg-slate-900 w-[90%] rounded-md h-12 flex justify-center items-center"
        }
        onPress={verified ? VerifyOtp : HandleVerify}
      >
        <Text className="text-white px-4 py-1">
          {verified ? "Verify" : "Submit"}
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
