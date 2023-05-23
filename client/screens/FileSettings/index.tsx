import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Modal, Pressable, Switch, Text, View } from "react-native";
import { ProfileParamList } from "../Profile/types";
import { Button, DeleteConfirmButton, Heading, Input } from "../../components";
import FileService from "../../service/fileService";
import { IFile } from "../../models/IFile";
import { useContext, useEffect, useState } from "react";
import { FileSettingsStyles } from "./styles";
import { conditionStyles } from "../../utils/conditionStyles";
import { useMediaQuery } from "react-responsive";
import { StoreContext } from "../../context/store";
import { AxiosError } from "axios";
import { observer } from "mobx-react-lite";
import { StackNavigation } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import { fromBytesToMegabytes } from "../../utils/fromBytesToMegabytes";
import { convertUnixDate } from "../../utils/convertUnixDate";

export const FileSettings = observer(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPublicSwitch, setIsPublicSwitch] = useState<boolean>(false);
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  const [currentNewName, setCurrentNewName] = useState<string>("");
  const [updatedNewName, setUpdatedNewName] = useState<string>("");
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  const { store } = useContext(StoreContext);
  const { isPublic, href, name, owner, capacity, deleteDate } =
    params.file as IFile;
  const navigation = useNavigation<StackNavigation>();

  const {
    wrapper,
    wrapperWide,
    text,
    publicSwitchWrapper,
    headerWrapper,
    settingsWrapper,
    modal,
    modalContentWrapper,
    modalText,
    modalTextWrapper,
  } = FileSettingsStyles;

  useEffect(() => {
    setIsPublicSwitch(!!isPublic);
  }, [isPublic]);

  useEffect(() => {
    setCurrentNewName(name);
  }, [name]);

  const setPublicHandler = async () => {
    setIsPublicSwitch((prev) => !prev);
    try {
      store.setLoading(true);
      await FileService.setFilePublic(href);
    } catch (e: any | AxiosError) {
      if (e?.response?.data) {
        setError(
          (e.response.data?.errors && e.response.data?.errors[0]?.msg) ||
            e.response.data.message ||
            "Something went wrong"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      store.setLoading(false);
    }
  };

  const renameFile = async () => {
    try {
      store.setLoading(true);
      await FileService.renameFile(href, currentNewName);
      setUpdatedNewName(currentNewName);
    } catch (e: any | AxiosError) {
      if (e?.response?.data) {
        setError(
          (e.response.data?.errors && e.response.data?.errors[0]?.msg) ||
            e.response.data.message ||
            "Something went wrong"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      store.setLoading(false);
    }
  };

  const downloadFile = async () => {
    setIsLoading(true);
    try {
      if (isPublic) {
        await FileService.downloadFile(href);
      } else {
        await FileService.downloadProtectedFile(href);
      }
    } catch (e: any | AxiosError) {
      if (e?.response?.data) {
        setError(
          (e.response.data?.errors && e.response.data?.errors[0]?.msg) ||
            e.response.data.message ||
            "Something went wrong"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async () => {
    await FileService.deleteFile(href);
    if (deleteDate) {
      navigation.navigate("FilesAndFoldersForUser");
    } else {
      navigation.navigate("Trash");
    }
  };

  return (
    <>
      <View
        style={{
          ...wrapper,
          ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
        }}
      >
        <View style={headerWrapper}>
          <FontAwesome name="file" size={70} color="#047857" />
          <Heading
            label={`${
              updatedNewName || name + ` (${fromBytesToMegabytes(capacity)})MB`
            }`}
          />
        </View>
        {deleteDate && (
          <Text style={text}>Delete date: {convertUnixDate(deleteDate)}</Text>
        )}
        <Button title="Download" onPress={downloadFile} isLoading={isLoading} />
        {owner === store.user.id && (
          <View style={settingsWrapper}>
            <Heading label="Settings" />
            {deleteDate ? null : (
              <>
                <Input
                  noError={true}
                  labelText="New file name"
                  onChangeText={(value: string) => setCurrentNewName(value)}
                  defaultValue={currentNewName}
                  onSubmitEditing={renameFile}
                />
                <View style={publicSwitchWrapper}>
                  <Text style={text}>Set public</Text>
                  <Switch
                    onValueChange={setPublicHandler}
                    value={isPublicSwitch}
                  />
                </View>
              </>
            )}
            <DeleteConfirmButton
              deleteFunction={deleteFile}
              buttonTitle={
                deleteDate ? "Restore from trash" : "Move file to trash"
              }
            />
          </View>
        )}
      </View>
      <Modal
        visible={!!error}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setError("");
        }}
      >
        <Pressable
          style={modal}
          onPress={(event) =>
            event.target == event.currentTarget && setError("")
          }
        >
          <View style={modalContentWrapper}>
            <View style={modalTextWrapper}>
              <Text style={modalText}>{error}</Text>
              <Button type="primary" title="OK" onPress={() => setError("")} />
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
});
