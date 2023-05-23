import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Switch, Text, View } from "react-native";
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

export const FileSettings = observer(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPublicSwitch, setIsPublicSwitch] = useState<boolean>(false);
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  const [currentNewName, setCurrentNewName] = useState<string>("");
  const [updatedNewName, setUpdatedNewName] = useState<string>("");
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  const { store } = useContext(StoreContext);
  const { isPublic, href, name, owner } = params.file as IFile;
  const navigation = useNavigation<StackNavigation>();

  const {
    wrapper,
    wrapperWide,
    text,
    publicSwitchWrapper,
    headerWrapper,
    settingsWrapper,
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
    } catch (error: any | AxiosError) {
      setIsError(true);
    } finally {
      store.setLoading(false);
    }
  };

  const renameFile = async () => {
    try {
      store.setLoading(true);
      await FileService.renameFile(href, currentNewName);
      setUpdatedNewName(currentNewName);
    } catch (error: any | AxiosError) {
      setIsError(true);
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
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async () => {
    await FileService.deleteFile(href);
    navigation.navigate("FilesAndFoldersForUser");
  };

  return (
    <View
      style={{
        ...wrapper,
        ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
      }}
    >
      <View style={headerWrapper}>
        <FontAwesome name="file" size={70} color="#047857" />
        <Heading label={`${updatedNewName || name} file`} />
      </View>
      <Button title="Download" onPress={downloadFile} isLoading={isLoading} />
      {owner === store.user.id && (
        <View style={settingsWrapper}>
          <Heading label="Settings" />
          <Input
            noError={true}
            labelText="New file name"
            onChangeText={(value: string) => setCurrentNewName(value)}
            defaultValue={currentNewName}
            onSubmitEditing={renameFile}
          />
          <View style={publicSwitchWrapper}>
            <Text style={text}>Set public</Text>
            <Switch onValueChange={setPublicHandler} value={isPublicSwitch} />
          </View>
          <DeleteConfirmButton
            deleteFunction={deleteFile}
            buttonTitle="Delete file"
          />
        </View>
      )}
    </View>
  );
});
