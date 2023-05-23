import { useContext, useState } from "react";
import { Button } from "../Button";
import { Modal, Pressable, View, Text } from "react-native";
import { StoreContext } from "../../context/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../screens/types";
import { DeleteAccountButtonStyles } from "./styles";

export const DeleteAccountButton = () => {
  const { store } = useContext(StoreContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigation>();

  const deleteAccount = async () => {
    await store.deleteUser();
    navigation.navigate("Auth");
  };

  const {
    modal,
    modalContentWrapper,
    modalText,
    buttonWrapper,
    buttonsWrapper,
  } = DeleteAccountButtonStyles;

  return (
    <>
      <Button
        title="Delete account"
        onPress={() => setShowModal(true)}
        type="danger"
      />
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <Pressable
          style={modal}
          onPress={(event) =>
            event.target == event.currentTarget && setShowModal(false)
          }
        >
          <View style={modalContentWrapper}>
            <Text style={modalText}>Are you sure?</Text>
            <View style={buttonsWrapper}>
              <View style={buttonWrapper}>
                <Button
                  title="No"
                  onPress={() => setShowModal(false)}
                  type="secondary"
                />
              </View>
              <View style={buttonWrapper}>
                <Button title="Yes" type="danger" onPress={deleteAccount} />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
