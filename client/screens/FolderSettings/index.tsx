import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ProfileParamList } from "../Profile/types";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store";
import { IFolder } from "../../models/IFolder";
import { View, Text, Switch, Modal, Pressable } from "react-native";
import { conditionStyles } from "../../utils/conditionStyles";
import { useMediaQuery } from "react-responsive";
import { FolderSettingsStyles } from "./styles";
import { Button, DeleteConfirmButton, Heading, Input } from "../../components";
import { Entypo } from "@expo/vector-icons";
import { fromBytesToMegabytes } from "../../utils/fromBytesToMegabytes";
import FoldersService from "../../service/folderService";
import { AxiosError } from "axios";
import { StackNavigation } from "../types";
import { convertUnixDate } from "../../utils/convertUnixDate";

export const FolderSettings = () => {
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  const { store } = useContext(StoreContext);
  const [currentNewName, setCurrentNewName] = useState<string>("");
  const [updatedNewName, setUpdatedNewName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isPublicSwitch, setIsPublicSwitch] = useState<boolean>(false);
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const navigation = useNavigation<StackNavigation>();

  const { name, filesCapacity, owner, id, isPublic, deleteDate } =
    params.folder as IFolder;
  const {
    wrapper,
    wrapperWide,
    headerWrapper,
    text,
    settingsWrapper,
    publicSwitchWrapper,
    modal,
    modalContentWrapper,
    modalText,
    modalTextWrapper,
  } = FolderSettingsStyles;

  const renameFolder = async () => {
    try {
      store.setLoading(true);
      await FoldersService.renameFolder(id, currentNewName);
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

  const setPublicHandler = async () => {
    setIsPublicSwitch((prev) => !prev);
    try {
      store.setLoading(true);
      await FoldersService.setFolderPublic(id);
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

  const deleteFolder = async () => {
    await FoldersService.deleteFolder(id);
    if (deleteDate) {
      navigation.navigate("FilesAndFoldersForUser");
    } else {
      navigation.navigate("Trash");
    }
  };

  useEffect(() => {
    setIsPublicSwitch(!!isPublic);
  }, [isPublic]);

  useEffect(() => {
    setCurrentNewName(name);
  }, [name]);

  return (
    <>
      <View
        style={{
          ...wrapper,
          ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
        }}
      >
        <View style={headerWrapper}>
          <Entypo name="folder" size={70} color="#047857" />
          <Heading label={`${updatedNewName || name}`} />
        </View>
        <Text style={text}>
          Capacity: {fromBytesToMegabytes(filesCapacity)}MB
        </Text>
        {deleteDate && (
          <Text style={text}>Delete date: {convertUnixDate(deleteDate)}</Text>
        )}
        {owner === store.user.id && (
          <View style={settingsWrapper}>
            <Heading label="Settings" />
            {deleteDate ? null : (
              <>
                <Input
                  noError={true}
                  labelText="New folder name"
                  onChangeText={(value: string) => setCurrentNewName(value)}
                  defaultValue={currentNewName}
                  onSubmitEditing={renameFolder}
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
              deleteFunction={deleteFolder}
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
};
