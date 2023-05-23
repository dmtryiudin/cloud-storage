import { useState } from "react";
import { View } from "react-native";
import { Button, DropDown, ImagePicker, Input } from "../../components";
import countryList from "country-list";
import { ISetUser } from "../../models/ISetUser";
import UserService from "../../service/userService";
import { AxiosError } from "axios";
import * as DocumentPicker from "expo-document-picker";

export const ProfileSettings = () => {
  const [avatar, setAvatar] = useState<DocumentPicker.DocumentResult | null>(
    null
  );
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
    try {
      await UserService.updateUser(name, country, avatar);
      console.log("done");
    } catch (e: any | AxiosError) {
      console.log("error", JSON.stringify(e));
    }
  };

  return (
    <View>
      <ImagePicker avatar={avatar} setAvatar={setAvatar} />
      <Input labelText={""} />
      <DropDown
        labelText="Country"
        variants={countryList.getNames()}
        currentValue={countryList.getName(formData.country) || ""}
        setCurrentValue={setCountry}
      />
      <Button title="submit" onPress={submitForm} />
    </View>
  );
};
