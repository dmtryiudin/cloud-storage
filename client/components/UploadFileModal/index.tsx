import { Modal, Pressable, View, Text } from "react-native";
import { IUploadFileModalProps } from "./types";
import { UploadFileModalStyles } from "./styles";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Button } from "../Button";
import { Input } from "../Input";
import FileService from "../../service/fileService";
import { AxiosError } from "axios";
import { Heading } from "../Heading";

export const UploadFileModal: React.FC<IUploadFileModalProps> = ({
  showModal,
  setShowModal,
  folder,
}) => {
  const { modal, modalContentWrapper, fileUpload } = UploadFileModalStyles;
  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);
  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);
  const [currentName, setCurrentName] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");

  const filePicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });

    if (result?.type === "success") {
      setFile(result);
    }
  };

  const submitForm = async () => {
    try {
      setIsRequestLoading(true);
      if (!file) {
        setRequestError("No file");
      } else if (!currentName) {
        setRequestError("No file name");
      } else {
        await FileService.uploadFile(currentName, file, folder);
        setShowModal(false);
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
    setFile(null);
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
          <Heading label="Upload your file" />
          <Input
            error={requestError}
            labelText="Title"
            onChangeText={(value: string) => setCurrentName(value)}
            defaultValue={currentName}
          />
          <View style={fileUpload}>
            <Button title="Choose file" type="secondary" onPress={filePicker} />
            <Text>{file?.type === "success" ? file.name : ""}</Text>
          </View>
          <Button
            title="Upload file"
            onPress={submitForm}
            isLoading={isRequestLoading}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
