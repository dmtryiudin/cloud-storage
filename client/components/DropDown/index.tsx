import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  GestureResponderEvent,
  Animated,
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
  const [height, setHeight] = useState(new Animated.Value(0));
  const { fieldText, field, fieldFocused, wrapper, label, list } =
    DropDownStyles;

  const clearHandler = (e: GestureResponderEvent) => {
    e.stopPropagation();
    setCurrentValue("");
  };

  useEffect(() => {
    if (isDropDownOpened) {
      Animated.timing(height, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isDropDownOpened]);

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={wrapper}>
      <Text style={label}>{labelText}</Text>
      <TouchableOpacity
        onPress={() => {
          if (!isDropDownOpened) {
            setIsDropDownOpened(true);
          }
        }}
        style={{ ...field, ...conditionStyles(fieldFocused, isDropDownOpened) }}
      >
        <Text style={fieldText}>{currentValue}</Text>
        <Ionicons name="close" size={24} color="black" onPress={clearHandler} />
      </TouchableOpacity>
      <Animated.View style={{ maxHeight }}>
        <OutsidePressHandler
          onOutsidePress={() => setIsDropDownOpened(false)}
          disabled={!isDropDownOpened}
        >
          <FlatList
            style={{
              ...list,
              ...conditionStyles({ borderWidth: 0 }, !isDropDownOpened),
            }}
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
      </Animated.View>
    </View>
  );
};
