import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DraxProvider, DraxView } from "react-native-drax";
import FileService from "../../service/fileService";

export const Folder = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const [showDragArea, setShowDragArea] = useState<boolean>(false);
  const [draggedFile, setDraggedFile] = useState<string>("");
  const isFocused = useIsFocused();
  const [{ isLoading, data, error }, setFolder] = useState<IResponse<IFolder>>({
    isLoading: true,
    error: null,
    data: null,
  });

  const {
    wrapper,
    wrapperWide,
    header,
    fileItem,
    headerButtonsWrapper,
    moveFileFromFolderArea,
    moveFileDanger,
    text,
  } = FolderStyles;
  const navigation = useNavigation<StackNavigation>();

  const getFolderData = async () => {
    setFolder({
      isLoading: true,
      error: null,
      data: null,
    });
    try {
      let data = null;
      if (params.isPublic) {
        data = (await FoldersService.getPublicFolder(params.folderId)).data;
      } else {
        data = (await FoldersService.getPrivateFolder(params.folderId)).data;
      }
      setFolder({
        isLoading: false,
        error: null,
        data,
      });
    } catch (error: ErrorType | any) {
      setFolder({
        isLoading: false,
        error,
        data: null,
      });
    }
  };

  useEffect(() => {
    getFolderData();
  }, [isFocused]);

  const removeFolderForFile = async (href: string) => {
    try {
      setFolder({ data, error, isLoading: true });
      await FileService.setFolder(href);
      await getFolderData();
    } catch (error: ErrorType | any) {
      setFolder({
        isLoading: false,
        error,
        data: null,
      });
    }
  };
  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (data) {
    return (
      <>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <DraxProvider>
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
              <FlatList
                numColumns={3}
                data={data.files}
                renderItem={({ item }) => (
                  <DraxView
                    longPressDelay={500}
                    style={fileItem}
                    payload={item.href}
                    onDragStart={() => {
                      setDraggedFile(item.href);
                      setShowDragArea(true);
                    }}
                    onDragEnd={() => {
                      setDraggedFile("");
                      setShowDragArea(false);
                    }}
                    onDragDrop={() => {
                      setDraggedFile("");
                    }}
                  >
                    <FileButton
                      file={item}
                      isDragging={item.href === draggedFile}
                    />
                  </DraxView>
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
              {showDragArea && (
                <DraxView
                  style={{
                    ...moveFileFromFolderArea,
                    ...(isMoved ? moveFileDanger : {}),
                  }}
                  onReceiveDragEnter={() => {
                    setIsMoved(true);
                  }}
                  onReceiveDragExit={() => {
                    setIsMoved(false);
                  }}
                  onReceiveDragDrop={({ dragged: { payload } }) => {
                    removeFolderForFile(payload);
                    setIsMoved(false);
                  }}
                >
                  <Text style={text}>Drop here to move from folder</Text>
                </DraxView>
              )}
            </View>
          </DraxProvider>
        </GestureHandlerRootView>
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
