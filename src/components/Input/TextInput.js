import React from "react";
import { TextInput } from "react-native-paper";

//icons
import Ionicons from "react-native-vector-icons/Ionicons";

export const CustomTextInput = (props) => {
  const {
    label,
    placeholder,
    onChangeText,
    value,
    password = false,
    keyboardType,
    error,
    iconRight,
    maxLength,
    rightClick,
    editable = true,
  } = props;
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      outlineColor="transparent"
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
      secureTextEntry={password}
      error={error}
      maxLength={maxLength}
      editable={editable}
      right={iconRight && <TextInput.Icon name={iconRight} size={24} onPress={rightClick} />}
    />
  );
};

export default CustomTextInput;
