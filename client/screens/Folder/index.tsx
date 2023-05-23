import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { useMediaQuery } from "react-responsive";
import { ProfileParamList } from "../Profile/types";
import { useEffect, useState } from "react";
import { IResponse } from "../../models/response/IResponse";
import { IFolder } from "../../models/IFolder";
import { FolderStyles } from "./styles";
import { conditionStyles } from "../../utils/conditionStyles";
import {
  Heading,
  LoadingScreen,
  Error,
  UploadFileModal,
  FileButton,
} from "../../components";
import FoldersService from "../../service/folderService";
import { Error as ErrorType } from "../../models/IError";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StackNavigation } from "../types";
import { Text } from "react-native";

export const Folder = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [{ isLoading, data, error }, setUserData] = useState<
    IResponse<IFolder>
  >({
    isLoading: true,
    error: null,
    data: null,
  });

  const { wrapper, wrapperWide, header, fileItem, headerButtonsWrapper } =
    FolderStyles;
  const navigation = useNavigation<StackNavigation>();

  const getFolderData = async () => {
    setUserData({
      isLoading: true,
      error: null,
      data: null,
    });
    try {
      const { data } = await FoldersService.getPrivateFolder(params.folderId);
      setUserData({
        isLoading: false,
        error: null,
        data,
      });
    } catch (error: ErrorType | any) {
      setUserData({
        isLoading: false,
        error,
        data: null,
      });
    }
  };

  useEffect(() => {
    getFolderData();
  }, [isFocused]);

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (data) {
    return (
      <>
        <View
          style={{
            ...wrapper,
            ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
          }}
        >
          <View style={header}>
            <Heading label={data.name} />
            <View style={headerButtonsWrapper}>
              <TouchableOpacity onPress={() => setShowFileModal(true)}>
                <MaterialIcons name="file-upload" size={40} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  data &&
                  navigation.navigate("FolderSettings", { folder: data })
                }
              >
                <Feather name="settings" size={40} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {
            <FlatList
              numColumns={3}
              data={data.files}
              renderItem={({ item }) => (
                <TouchableOpacity style={fileItem}>
                  <FileButton {...item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.href}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => {
                    getFolderData();
                  }}
                />
              }
            />
          }
        </View>
        <UploadFileModal
          folder={params.folderId}
          showModal={showFileModal}
          setShowModal={setShowFileModal}
          finishedLoading={getFolderData}
        />
      </>
    );
  }

  return null;
};
