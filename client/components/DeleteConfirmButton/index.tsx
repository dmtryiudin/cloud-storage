import { useState } from "react";
import { Button } from "../Button";
import { Modal, Pressable, View, Text } from "react-native";
import { DeleteConfirmButtonStyles } from "./styles";
import { IDeleteConfirmButtonProps } from "./types";

export const DeleteConfirmButton: React.FC<IDeleteConfirmButtonProps> = ({
  deleteFunction,
  buttonTitle,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteHandler = async () => {
    setIsLoading(true);
    await deleteFunction();
    setIsLoading(false);
  };

  const {
    modal,
    modalContentWrapper,
    modalText,
    buttonWrapper,
    buttonsWrapper,
  } = DeleteConfirmButtonStyles;

  return (
    <>
      <Button
        title={buttonTitle}
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
                <Button
                  title="Yes"
                  type="danger"
                  onPress={deleteHandler}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
