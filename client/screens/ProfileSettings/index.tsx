import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Button,
  DropDown,
  Heading,
  ImagePicker,
  Input,
} from "../../components";
import countryList from "country-list";
import { ISetUser } from "../../models/ISetUser";
import UserService from "../../service/userService";
import { AxiosError } from "axios";
import * as DocumentPicker from "expo-document-picker";
import { store } from "../../store/store";
import { ProfileSettingsStyles } from "./styles";
import { useMediaQuery } from "react-responsive";
import { conditionStyles } from "../../utils/conditionStyles";
import { API_URL } from "@env";

export const ProfileSettings = () => {
  const { avatar, name, login } = store.user;
  const [currentAvatar, setCurrentAvatar] = useState<
    DocumentPicker.DocumentResult | null | string
  >(null);

  useEffect(() => {
    if (avatar) {
      setCurrentAvatar(`${API_URL}${store?.user?.avatar}`);
    }
  }, []);

  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const [formData, setFormData] = useState<ISetUser>({
    name: "",
    country: "",
  });

  const setFormDataHandler = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const setCountry = (name: string) => {
    if (name) {
      return setFormDataHandler("country", countryList.getCode(name)!);
    }
    setFormDataHandler("country", "");
  };

  const submitForm = async () => {
    const { name, country } = formData;
    let filteredAvatar = currentAvatar;
    if (typeof filteredAvatar === "string") {
      filteredAvatar = null;
    }
    try {
      await UserService.updateUser(name, country, filteredAvatar);
      await store.checkAuth();
    } catch (e: any | AxiosError) {
      return null;
    }
  };

  const { wrapper, wrapperWide, inputsWrapper, headingWrapper } =
    ProfileSettingsStyles;

  return (
    <View
      style={{
        ...wrapper,
        ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
      }}
    >
      <View style={headingWrapper}>
        <Heading label={`${name || login} settings`} />
      </View>
      <ImagePicker avatar={currentAvatar} setAvatar={setCurrentAvatar} />
      <View style={inputsWrapper}>
        <Input
          labelText="Name"
          placeholder="User's new name"
          defaultValue={formData.name}
          onChangeText={(value: string) => setFormDataHandler("name", value)}
        />
        <DropDown
          labelText="Country"
          variants={countryList.getNames()}
          currentValue={countryList.getName(formData.country) || ""}
          setCurrentValue={setCountry}
        />
      </View>

      <Button title="Submit" onPress={submitForm} />
    </View>
  );
};
