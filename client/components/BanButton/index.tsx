import { Modal, Pressable, TouchableWithoutFeedback, View } from "react-native";
import { IBanButtonProps } from "./types";
import { Button } from "../Button";
import { useState } from "react";
import { Input } from "../Input";
import ModService from "../../service/modService";
import { BanButtonStyles } from "./styles";
import { AxiosError } from "axios";

export const BanButton: React.FC<IBanButtonProps> = ({ login }) => {
  const [reason, setReason] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const banHandler = async () => {
    try {
      setIsLoading(true);
      await ModService.banUser(login, reason);
      setShowModal(false);
    } catch (e: AxiosError | any) {
      setErrorText(e.response.data.errors[0].msg);
    } finally {
      setIsLoading(false);
    }
  };

  const { modalContentWrapper, buttonsWrapper, buttonWrapper, modal } =
    BanButtonStyles;

  return (
    <>
      <Button
        title={"Ban user"}
        type="danger"
        onPress={() => setShowModal(true)}
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
            <Input
              required={true}
              labelText="Ban reason"
              onChangeText={(value) => setReason(value)}
              defaultValue={reason}
              placeholder="Ban reason"
              error={errorText}
            />
            <View style={buttonsWrapper}>
              <View style={buttonWrapper}>
                <Button
                  type="secondary"
                  title="Cancel"
                  onPress={() => {
                    setShowModal(false);
                  }}
                />
              </View>
              <View style={buttonWrapper}>
                <Button
                  title="Ban"
                  type="danger"
                  onPress={banHandler}
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
