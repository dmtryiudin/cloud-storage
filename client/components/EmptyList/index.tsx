import React, { useRef } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { EmptyListStyles } from "./styles";

export const EmptyList = () => {
  const animation = useRef(null);

  return (
    <View style={EmptyListStyles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../../assets/animations/9923-box-empty.json")}
      />
    </View>
  );
};
