import { useState } from "react";
import { View, Text } from "react-native";
import { Link, LoginForm, RegistrationForm } from "../../components";
import { AuthStyles } from "./styles";

export const Auth = () => {
  const [accountExists, setAccountExists] = useState<boolean>(false);

  const setForm = () => {
    setAccountExists((prev) => !prev);
  };

  const { link, wrapper, text } = AuthStyles;

  return (
    <View style={wrapper}>
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
