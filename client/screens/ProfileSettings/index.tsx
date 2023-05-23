import { useContext, useEffect, useState } from "react";
import { Modal, Pressable, View, Text } from "react-native";
import {
  Button,
  DeleteAccountButton,
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
import { ProfileSettingsStyles } from "./styles";
import { useMediaQuery } from "react-responsive";
import { conditionStyles } from "../../utils/conditionStyles";
import { API_URL } from "@env";
import { StoreContext } from "../../context/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../types";
import AuthService from "../../service/authService";

export const ProfileSettings = () => {
  const { store } = useContext(StoreContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const { avatar, name, login, country, email } = store.user;
  const [currentAvatar, setCurrentAvatar] = useState<
    DocumentPicker.DocumentResult | null | string
  >(null);

  const navigation = useNavigation<StackNavigation>();
  useEffect(() => {
    if (avatar) {
      setCurrentAvatar(`${API_URL}${store?.user?.avatar}`);
    }
  }, []);

  useEffect(() => {
    if (store.error) {
      setIsError(true);
    }
  }, [store.error]);

  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const [formData, setFormData] = useState<ISetUser>({
    name: "",
    country: "",
  });

  const [currentEmail, setCurrentEmail] = useState<string>("");

  useEffect(() => {
    setFormData({
      name,
      country,
    });
  }, [name, country]);

  useEffect(() => {
    setCurrentEmail(email);
  }, [email]);

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
      store.setLoading(true);
      await UserService.updateUser(name, country, filteredAvatar);
      if (currentEmail && currentEmail !== email) {
        await AuthService.setEmail(currentEmail);
      }
      await store.checkAuth();
      navigation.navigate("Profile", { login });
    } catch (e: any | AxiosError) {
      if (e.response.status === 400) {
        if (e.response.data.message === "Validation error") {
          setErrorText(e.response.data.errors[0].msg);
        } else {
          setErrorText(e.response.data.message);
        }
      }
      setIsError(true);
    } finally {
      store.setLoading(false);
    }
  };

  const {
    wrapper,
    wrapperWide,
    inputsWrapper,
    headingWrapper,
    modal,
    modalContentWrapper,
    modalTextWrapper,
    modalText,
    deleteButton,
  } = ProfileSettingsStyles;

  return (
    <>
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
          <Input
            labelText="Email"
            placeholder="User's new email"
            defaultValue={currentEmail}
            onChangeText={(value: string) => setCurrentEmail(value)}
          />
          <DropDown
            labelText="Country"
            variants={countryList.getNames()}
            currentValue={
              formData.country
                ? countryList.getName(formData.country) || ""
                : ""
            }
            setCurrentValue={setCountry}
          />
        </View>

        <Button title="Submit" onPress={submitForm} />
        <View style={deleteButton}>
          <DeleteAccountButton />
        </View>
      </View>
      <Modal
        visible={isError}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setIsError(false);
        }}
      >
        <Pressable
          style={modal}
          onPress={(event) =>
            event.target == event.currentTarget && setIsError(false)
          }
        >
          <View style={modalContentWrapper}>
            <View style={modalTextWrapper}>
              <Text style={modalText}>
                {errorText || "Something went wrong"}
              </Text>
              <Button title="OK" onPress={() => setIsError(false)} />
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
