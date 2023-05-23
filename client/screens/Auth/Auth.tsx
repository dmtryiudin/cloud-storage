import { useState } from "react";
import { View, Text } from "react-native";
import { Link, LoginForm, RegistrationForm } from "../../components";
import { AuthStyles } from "./styles";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { conditionStyles } from "../../utils/conditionStyles";

export const Auth = () => {
  const [accountExists, setAccountExists] = useState<boolean>(false);
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const setForm = () => {
    setAccountExists((prev) => !prev);
  };

  const { link, wrapper, text, wrapperWide } = AuthStyles;

  return (
    <View
      style={{
        ...wrapper,
        ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
      }}
    >
      {accountExists ? (
        <LoginForm setSubPage={() => setAccountExists((prev) => !prev)} />
      ) : (
        <RegistrationForm />
      )}
      <View style={link}>
        <Text style={text}>
          {accountExists
            ? "Don't have an account yet?"
            : "Already have an account?"}
        </Text>
        <Link
          textLabel={accountExists ? "Registrate" : "Login"}
          onPress={setForm}
        />
      </View>
    </View>
  );
};
