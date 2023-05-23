import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { CountryListItemStyles } from "./styles";
import { ICountryListItem } from "./types";

export const CountryListItem: React.FC<ICountryListItem> = React.memo(
  ({ title, setCurrentValue, setIsDropDownOpened }) => {
    const itemChooseHandler = (item: string) => {
      setCurrentValue(item);
      setIsDropDownOpened(false);
    };

    const { listText } = CountryListItemStyles;

    return (
      <TouchableOpacity onPress={() => itemChooseHandler(title)}>
        <Text style={listText}>{title}</Text>
      </TouchableOpacity>
    );
  }
);
