import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Modal } from "react-native";
import { StoreContext } from "../../context/store";
import { Button } from "../Button";
import { Input } from "../Input";
import { LoginFormStyles } from "./styles";
import { ILoginFormProps } from "./types";
import { Link } from "../Link";
import { Heading } from "../Heading";
import { Loading } from "../Loading";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { conditionStyles } from "../../utils/conditionStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../screens/types";

export const LoginForm: React.FC<ILoginFormProps> = observer(
  ({ setSubPage }) => {
    const navigation = useNavigation<StackNavigation>();
    const { store } = useContext(StoreContext);
    const [formData, setFormData] = useState({
      login: "",
      password: "",
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [wasModalShown, setWasModalShown] = useState(true);
    const isTabletOrMobileDevice = useMediaQuery({
      minDeviceWidth: 600,
    });

    const setFormDataHandler = (fieldName: string, value: string) => {
      setFormData({ ...formData, [fieldName]: value });
    };

    const submitForm = async () => {
      setWasModalShown(false);
      const { login, password } = formData;
      await store.login(login, password);
      if (!store.error) {
        navigation.navigate("Profile");
      }
    };
    const resetForm = () => {
      setFormData({
        login: "",
        password: "",
      });
    };

    useEffect(() => {
      if (store.error?.statusCode === 401 && !wasModalShown) {
        setShowModal(true);
        resetForm();
        setWasModalShown(true);
      }
    }, [store.error]);

    const {
      wrapper,
      buttonsWrapper,
      buttonWrapper,
      modalContentWrapper,
      modalTextWrapper,
      modalText,
      headingWrapper,
      buttonWrapperWide,
      buttonsWrapperWide,
    } = LoginFormStyles;
    return (
      <>
        <View style={wrapper}>
          <View style={headingWrapper}>
            <Heading label="Login" />
          </View>

          <Input
            required={true}
            labelText="Login"
            placeholder="Your login"
            defaultValue={formData.login}
            onChangeText={(value: string) => setFormDataHandler("login", value)}
          />
          <Input
            required={true}
            labelText="Password"
            placeholder="Your password"
            defaultValue={formData.password}
            secureTextEntry={true}
            onChangeText={(value: string) =>
              setFormDataHandler("password", value)
            }
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
        </View>
        <Modal visible={showModal}>
          <View style={modalContentWrapper}>
            <View style={modalTextWrapper}>
              <Text style={modalText}>
                Wrong credentials! If you don't have an account, you can create
                it.
              </Text>
              <Link textLabel="Registrate" onPress={setSubPage} />
            </View>
          </View>
        </Modal>
        <Loading show={store.isLoading} />
      </>
    );
  }
);
