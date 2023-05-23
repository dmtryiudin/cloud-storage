import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StoreContext } from "../../context/store";
import { Button } from "../Button";
import { Input } from "../Input";
import { LoginFormStyles } from "./styles";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";
import { ILoginFormProps } from "./types";
import { Link } from "../Link";
import { Heading } from "../Heading";
import { Loading } from "../Loading";

export const LoginForm: React.FC<ILoginFormProps> = observer(
  ({ setSubPage }) => {
    const { store } = useContext(StoreContext);
    const [formData, setFormData] = useState({
      login: "",
      password: "",
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [wasModalShown, setWasModalShown] = useState(true);

    const setFormDataHandler = (fieldName: string, value: string) => {
      setFormData({ ...formData, [fieldName]: value });
    };

    const submitForm = async () => {
      setWasModalShown(false);
      const { login, password } = formData;
      await store.login(login, password);
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
            onChangeText={(value) => setFormDataHandler("login", value)}
          />
          <Input
            required={true}
            labelText="Password"
            placeholder="Your password"
            defaultValue={formData.password}
            secureTextEntry={true}
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
        <Modal
          visible={showModal}
          onTouchOutside={() => {
            setShowModal(false);
          }}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "top",
            })
          }
        >
          <ModalContent style={modalContentWrapper}>
            <View style={modalTextWrapper}>
              <Text style={modalText}>
                Wrong credentials! If you don't have an account, you can create
                it.
              </Text>
              <Link textLabel="Registrate" onPress={setSubPage} />
            </View>
          </ModalContent>
        </Modal>
        <Loading show={store.isLoading} />
      </>
    );
  }
);
