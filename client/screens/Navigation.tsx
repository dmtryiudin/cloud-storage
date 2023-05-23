import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Auth } from "./Auth";
import { Header } from "./Header";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => null,
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerTitle: () => null,
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: () => null,
            header: () => <Header />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
