import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  GestureResponderEvent,
} from "react-native";
import { conditionStyles } from "../../utils/conditionStyles";
import { DropDownStyles } from "./styles";
import { IDropDown } from "./types";
import OutsidePressHandler from "react-native-outside-press";
import React from "react";
import { CountryListItem } from "../CountryListItem";
import { Ionicons } from "@expo/vector-icons";

export const DropDown: React.FC<IDropDown> = ({
  variants,
  currentValue,
  setCurrentValue,
  labelText,
}) => {
  const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(false);
  const { fieldText, field, fieldFocused, wrapper, label, list } =
    DropDownStyles;

  const clearHandler = (e: GestureResponderEvent) => {
    e.stopPropagation();
    setCurrentValue("");
  };
  return (
    <View style={wrapper}>
      <Text style={label}>{labelText}</Text>
      <TouchableOpacity
        onPress={() => setIsDropDownOpened((prev) => !prev)}
        style={{ ...field, ...conditionStyles(fieldFocused, isDropDownOpened) }}
      >
        <Text style={fieldText}>{currentValue}</Text>
        <Ionicons name="close" size={24} color="black" onPress={clearHandler} />
      </TouchableOpacity>

      {isDropDownOpened && (
        <OutsidePressHandler
          onOutsidePress={() => setIsDropDownOpened(false)}
          disabled={false}
        >
          <FlatList
            style={list}
            data={variants}
            renderItem={({ item }) => {
              return (
                <CountryListItem
                  title={item}
                  setCurrentValue={setCurrentValue}
                  setIsDropDownOpened={setIsDropDownOpened}
                />
              );
            }}
          />
        </OutsidePressHandler>
      )}
    </View>
  );
};
