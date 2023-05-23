import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { View, Text } from "react-native";
import { StoreContext } from "../../context/store";
import { Button } from "../Button";
import { Input } from "../Input";
import { LoginFormStyles } from "./styles";

export const LoginForm = observer(() => {
  const { store } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const setFormDataHandler = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const submitForm = async () => {
    const { login, password } = formData;
    await store.login(login, password);
  };
  const resetForm = () => {
    setFormData({
      login: "",
      password: "",
    });
  };

  const { wrapper, buttonsWrapper, buttonWrapper } = LoginFormStyles;

  if (store.isLoading) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }
  return (
    <View style={wrapper}>
      <Text>
        {store.isAuth ? store.user.login + " Is authorized" : "not authorized"}
      </Text>
      <Input
        labelText="Login"
        defaultValue={formData.login}
        onChangeText={(value) => setFormDataHandler("login", value)}
      />
      <Input
        labelText="Password"
        defaultValue={formData.password}
        onChangeText={(value) => setFormDataHandler("password", value)}
      />
      <View style={buttonsWrapper}>
        <View style={buttonWrapper}>
          <Button title="Reset" type="secondary" onPress={resetForm} />
        </View>
        <View style={buttonWrapper}>
          <Button title="Submit" onPress={submitForm} />
        </View>
      </View>
    </View>
  );
});
