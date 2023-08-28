/// <reference types="nativewind/types" />
import React from "react";
import { Button, ButtonProps } from "react-native";

interface NewButtonProps extends ButtonProps {
  title: string;
  className?: string;
}

const CustomButton: React.FC<NewButtonProps> = ({
  title,
  className,
  ...props
}) => {
  return <Button title={title} className={className} {...props} />;
};

export default CustomButton;
