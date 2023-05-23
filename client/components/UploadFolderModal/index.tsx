import { Modal, Pressable, View } from "react-native";
import { IUploadFolderModalProps } from "./types";
import { Heading } from "../Heading";
import { UploadFolderModalStyles } from "./styles";
import { Input } from "../Input";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import FoldersService from "../../service/folderService";

export const UploadFolderModal: React.FC<IUploadFolderModalProps> = ({
  showModal,
  setShowModal,
  finishedLoading,
}) => {
  const { modal, modalContentWrapper } = UploadFolderModalStyles;

  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);
  const [currentName, setCurrentName] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");

  const submitForm = async () => {
    try {
      setIsRequestLoading(true);
      if (currentName) {
        await FoldersService.createFolder(currentName);
      } else {
        setRequestError("No folder name");
      }
      setShowModal(false);
      if (finishedLoading) {
        finishedLoading();
      }
    } catch (e: any | AxiosError) {
      if (e?.response?.data) {
        setRequestError(
          (e.response.data?.errors && e.response.data?.errors[0]?.msg) ||
            e.response.data.message ||
            "Unknown error. Most likely your file is too large (limit is 100MB)"
        );
      } else {
        setRequestError(
          "Unknown error. Most likely your file is too large (limit is 100MB)"
        );
      }
    } finally {
      setIsRequestLoading(false);
    }
  };

  useEffect(() => {
    setCurrentName("");
  }, [showModal]);

  return (
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
          <Heading label="Create folder" />
          <Input
            labelText="Folder name"
            error={requestError}
            onChangeText={(value: string) => setCurrentName(value)}
            defaultValue={currentName}
          />
          <Button
            title="Create folder"
            onPress={submitForm}
            isLoading={isRequestLoading}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
