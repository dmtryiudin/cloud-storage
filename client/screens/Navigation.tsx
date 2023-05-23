import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Auth } from "./Auth";
import { Header } from "./Header";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { RootStackParamList } from "./types";
import { ProfileSettings } from "./ProfileSettings";

const Stack = createNativeStackNavigator<RootStackParamList>();
export const Navigation = () => {
  const options = {
    headerTitle: () => null,
    header: () => <Header />,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={options} />
        <Stack.Screen name="Auth" component={Auth} options={options} />
        <Stack.Screen name="Profile" component={Profile} options={options} />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
