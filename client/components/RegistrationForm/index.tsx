import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StoreContext } from "../../context/store";
import { IValidationError } from "../../models/IValidationError";
import { Button } from "../Button";
import { DropDown } from "../DropDown";
import { Input } from "../Input";
import { RegistrationFormStyles } from "./styles";
import countryList from "country-list";
import { Heading } from "../Heading";
import { Loading } from "../Loading";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { conditionStyles } from "../../utils/conditionStyles";

export const RegistrationForm = observer(() => {
  const { store } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    name: "",
    country: "",
  });

  const [formErrors, setFormErrors] = useState({
    login: "",
    password: "",
    name: "",
    country: "",
  });

  useEffect(() => {
    if (store.error) {
      const { data, statusCode } = store.error;
      if (statusCode === 400) {
        let errors: typeof formErrors = {
          login: "",
          password: "",
          name: "",
          country: "",
        };

        data.errors.forEach((e: IValidationError) => {
          errors = { ...errors, [e.param]: e.msg };
        });

        setFormErrors(errors);
      }
    }
  }, [store.error]);

  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const setFormDataHandler = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const submitForm = async () => {
    const { login, password, name, country } = formData;
    await store.registration(login, password, name, country);
  };

  const resetForm = () => {
    setFormData({
      login: "",
      password: "",
      name: "",
      country: "",
    });
  };

  const setCountry = (name: string) => {
    if (name) {
      return setFormDataHandler("country", countryList.getCode(name)!);
    }
    setFormDataHandler("country", "");
  };
  const {
    wrapper,
    buttonWrapper,
    buttonsWrapper,
    headingWrapper,
    buttonWrapperWide,
    buttonsWrapperWide,
  } = RegistrationFormStyles;

  return (
    <View style={wrapper}>
      <View style={headingWrapper}>
        <Heading label="Registrate" />
      </View>
      <Input
        required={true}
        labelText="Login"
        placeholder="Your login"
        defaultValue={formData.login}
        onChangeText={(value) => setFormDataHandler("login", value)}
        error={formErrors.login}
      />
      <Input
        required={true}
        labelText="Password"
        placeholder="Your password"
        defaultValue={formData.password}
        secureTextEntry={true}
        onChangeText={(value) => setFormDataHandler("password", value)}
        error={formErrors.password}
      />
      <Input
        labelText="Name"
        placeholder="Your name"
        defaultValue={formData.name}
        onChangeText={(value) => setFormDataHandler("name", value)}
        error={formErrors.name}
      />
      <DropDown
        labelText="Country"
        variants={countryList.getNames()}
        currentValue={countryList.getName(formData.country) || ""}
        setCurrentValue={setCountry}
      />
      <View
        style={{
          ...buttonsWrapper,
          ...conditionStyles(buttonsWrapperWide, isTabletOrMobileDevice),
        }}
      >
        <View
          style={{
            ...buttonWrapper,
            ...conditionStyles(buttonWrapperWide, isTabletOrMobileDevice),
          }}
        >
          <Button title="Reset" type="secondary" onPress={resetForm} />
        </View>
        <View
          style={{
            ...buttonWrapper,
            ...conditionStyles(buttonWrapperWide, isTabletOrMobileDevice),
          }}
        >
          <Button title="Submit" onPress={submitForm} />
        </View>
      </View>
      <Loading show={store.isLoading} />
    </View>
  );
});
