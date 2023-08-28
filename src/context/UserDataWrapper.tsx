import React from "react";
import { createContext, useContext } from "react";

interface IUserContextApi {
  aadhaarNumber: string;
  setAadhaarNumber: React.Dispatch<React.SetStateAction<string>>;
  userOtp: string;
  setUserOtp: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<IUserContextApi>({
  aadhaarNumber: "",
  setAadhaarNumber: function (value: React.SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
  userOtp: "",
  setUserOtp: function (value: React.SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
});

interface IUserContext {
  children: React.ReactNode;
}

const UserDataWrapper = ({ children }: IUserContext) => {
  const [aadhaarNumber, setAadhaarNumber] = React.useState<string>("");
  const [userOtp, setUserOtp] = React.useState<string>("");
  return (
    <UserContext.Provider
      value={{ aadhaarNumber, setAadhaarNumber, userOtp, setUserOtp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserDataWrapper;

export const useLandVerification = () => useContext(UserContext);
